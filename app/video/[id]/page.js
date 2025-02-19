// app/video/[id]/page.js
'use client';
import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NavBar from 'components/NavBar';
import { useParams } from 'next/navigation';

export default function VideoPlayback() {
  const params = useParams();
  const videoId = params.id; // Assuming dynamic route [id]
  // Construct the video URL (adjust BASE_URL as needed)
  const videoURL = `/video/${videoId}`;
  const videoRef = useRef(null);

  const rewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  const fastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  return (
    <div>
      <NavBar />
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Video Playback</Typography>
        <video ref={videoRef} src={videoURL} controls style={{ width: '100%', maxWidth: '800px' }}>
          Your browser does not support the video tag.
        </video>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={rewind} sx={{ mr: 2 }}>Rewind 5s</Button>
          <Button variant="contained" onClick={fastForward}>Fast-forward 5s</Button>
        </Box>
      </Box>
    </div>
  );
}
