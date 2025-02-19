// app/api/generate_quiz/route.js
export async function POST(request) {
  try {
    const { layout, questions, userEmail, quizTitle } = await request.json();
    console.log("Received payload:", { layout, questions, userEmail, quizTitle });
    // Call the Flask endpoint (set NEXT_PUBLIC_FLASK_ENDPOINT in your .env.local)
    const FLASK_ENDPOINT = process.env.NEXT_PUBLIC_FLASK_ENDPOINT;
    if (!FLASK_ENDPOINT) {
      throw new Error("Flask backend endpoint not defined");
    }
    const response = await fetch(FLASK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout, questions, userEmail, quizTitle }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Backend error: ${response.status}`);
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate_quiz:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
