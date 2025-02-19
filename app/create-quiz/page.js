// app/create-quiz/page.js
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useSession } from "next-auth/react";

// IMPORTANT: If your NavBar is already "fixed" in its own code,
// you can remove the inline style below. 
// Otherwise, this style ensures the NavBar is pinned to the top.
import NavBar from 'components/NavBar';

export default function CreateQuiz() {
  const { data: session } = useSession();
  const [layout, setLayout] = useState("fun");
  const [qaPairs, setQaPairs] = useState([{ question: "", correct_answer: "" }]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...qaPairs];
    updated[index][field] = value;
    setQaPairs(updated);
  };

  const addPair = () => {
    setQaPairs([...qaPairs, { question: "", correct_answer: "" }]);
  };

  const deletePair = (index) => {
    const updated = qaPairs.filter((_, idx) => idx !== index);
    setQaPairs(updated);
  };

  const handleCreateVideo = async () => {
    if (!session) {
      setErrorMsg("Please sign in before creating a quiz.");
      return;
    }
    if (!quizTitle) {
      setErrorMsg("Please provide a quiz title.");
      return;
    }
    for (let pair of qaPairs) {
      if (!pair.question || !pair.correct_answer) {
        setErrorMsg("Please fill in all questions and answers.");
        return;
      }
    }
    setLoading(true);
    setErrorMsg("");
    setMessage("");
    setVideoURL("");

    const payload = { layout, quizTitle, questions: qaPairs, userEmail: session.user.email };

    try {
      const FLASK_ENDPOINT = process.env.NEXT_PUBLIC_FLASK_ENDPOINT;
      if (!FLASK_ENDPOINT) {
        throw new Error("Flask backend endpoint not defined.");
      }
      const res = await fetch(`${FLASK_ENDPOINT}/generate_quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Backend error");
      }
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* FIXED NavBar at the very top */}
      <NavBar
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
        }}
      />

      {/* Push content down by 80px so it’s not hidden behind the NavBar */}
      <Box sx={{ pt: '80px', p: 4 }}>
        <Typography variant="h4" gutterBottom>Create a New Quiz</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Layout</InputLabel>
          <Select
            value={layout}
            label="Layout"
            onChange={(e) => setLayout(e.target.value)}
          >
            <MenuItem value="fun">Fun</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Quiz Title"
          fullWidth
          margin="normal"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        {qaPairs.map((pair, idx) => (
          <Card key={idx} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Flashcard #{idx + 1}</Typography>
                {qaPairs.length > 1 && (
                  <IconButton color="error" onClick={() => deletePair(idx)}>
                    <RemoveCircle />
                  </IconButton>
                )}
              </Box>
              <TextField
                label="Question"
                fullWidth
                margin="normal"
                value={pair.question}
                onChange={(e) => handleChange(idx, "question", e.target.value)}
              />
              <TextField
                label="Correct Answer"
                fullWidth
                margin="normal"
                value={pair.correct_answer}
                onChange={(e) => handleChange(idx, "correct_answer", e.target.value)}
              />
            </CardContent>
          </Card>
        ))}

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="outlined" startIcon={<AddCircle />} onClick={addPair}>
            Add Flashcard
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateVideo}
            disabled={loading}
          >
            {loading ? "Generating Video..." : "Create Video"}
          </Button>
        </Box>

        {errorMsg && (
          <Typography mt={2} color="error">
            Error: {errorMsg}
          </Typography>
        )}
        {message && (
          <Typography mt={2} color="primary">
            {message}
          </Typography>
        )}
        {videoURL && (
          <Box mt={4}>
            <Typography variant="h5" mb={2}>
              Generated Video:
            </Typography>
            <video width="100%" controls src={videoURL} style={{ maxWidth: '100%' }}>
              Your browser does not support the video tag.
            </video>
          </Box>
        )}
      </Box>
    </Box>
  );
}
