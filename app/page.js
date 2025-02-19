// app/page.js
'use client';

import React from 'react';
import { Box, Typography, Button, Grid, Container, Fade } from '@mui/material';
import NavBar from './components/NavBar';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      {/* NavBar is fixed-position, so it will float at the top */}
      <NavBar />

      {/* Hero Section with Gradient + Subtle Animation */}
      <Box
        sx={{
          // Remove extra top padding so the NavBar is truly at the top
          position: 'relative',
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          pt: 12, // some vertical padding for the hero text
          pb: 10,
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
          // Because NavBar is "fixed", content starts behind it.
          // Increase pt if you want more space below the NavBar.
        }}
      >
        <Container>
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 'bold', mb: 2 }}
              >
                Welcome to Flashcard Quiz Creator
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Create interactive and engaging quiz videos effortlessly.
              </Typography>
              <Box sx={{ display: 'inline-flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="/library"
                >
                  Explore Library
                </Button>
                {!session && (
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    href="#how-it-works"
                  >
                    How It Works
                  </Button>
                )}
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Wave Shape Divider */}
        <Box
          component="svg"
          sx={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L80,192C160,192,320,192,480,160C640,128,800,64,960,42.7C1120,21,1280,43,1360,53.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Box>
      </Box>

      {/* "How It Works" Section */}
      <Box id="how-it-works" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            A quick overview of creating and sharing interactive quiz videos.
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                {/* Mock Screenshot / Example of a quiz or UI */}
                <Image
                  src="/mock-screenshot.png"
                  alt="Mock Screenshot"
                  width={400}
                  height={300}
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Step 1: Create
              </Typography>
              <Typography variant="body1" paragraph>
                Choose your quiz layout, add questions and correct answers, and let our system generate an interactive video.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Step 2: Share
              </Typography>
              <Typography variant="body1" paragraph>
                Share the generated video link or embed it in your site. Let your friends or students test their knowledge.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Step 3: Track
              </Typography>
              <Typography variant="body1">
                Monitor engagement, see which questions are the trickiest, and keep refining your quizzes for better results.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
