// app/api/quizzes/route.js
import clientPromise from "lib/mongodb";

export async function POST(request) {
  try {
    // Parse the incoming JSON payload.
    const payload = await request.json();
    const { userEmail, layout, questions, videoData } = payload;
    
    console.log("Quiz Payload Received:", { userEmail, layout, questions, videoData: videoData ? "present" : "empty" });

    // Connect to the database.
    const client = await clientPromise;
    const db = client.db("flashcard-quiz");

    // Insert the quiz data into the "quizzes" collection.
    const result = await db.collection("quizzes").insertOne({
      userEmail,
      layout,
      questions,
      videoData, // Could be a URL or base64 string.
      createdAt: new Date(),
    });

    console.log("Quiz saved with ID:", result.insertedId);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving quiz:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");
    if (!userEmail) {
      return new Response(JSON.stringify({ error: "userEmail required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const client = await clientPromise;
    const db = client.db("flashcard-quiz");
    const quizzes = await db.collection("quizzes").find({ userEmail }).toArray();
    return new Response(JSON.stringify({ quizzes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
