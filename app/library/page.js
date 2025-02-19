// app/library/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemButton } from '@mui/material';
import NavBar from 'components/NavBar';
import { useSession } from "next-auth/react";

export default function Library() {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/quizzes?userEmail=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setQuizzes(data.quizzes || []))
        .catch((err) => console.error("Error fetching quizzes:", err));
    }
  }, [session]);

  const handleClick = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <div>
      <NavBar />
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Your Quiz Library</Typography>
        {quizzes.length === 0 ? (
          <Typography>No quizzes found.</Typography>
        ) : (
          <List>
            {quizzes.map((quiz) => (
              <ListItem key={quiz.id} disablePadding>
                <ListItemButton onClick={() => handleClick(quiz.video_url)}>
                  <Typography variant="h6">{quiz.quizTitle || "Untitled Quiz"}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
}
