// app/components/VideoPlayer.js
'use client';

import React from 'react';
import { Button, Box } from '@mui/material';

export default function VideoPlayer({ videoURL }) {
  const videoRef = React.useRef(null);

  const rewind10Seconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const enterFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Safari
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE11
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <Box>
      <video
        ref={videoRef}
        src={videoURL}
        controls
        style={{ width: "100%", maxHeight: "500px", borderRadius: '8px' }}
      />
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={rewind10Seconds}>Rewind 10s</Button>
        <Button variant="contained" onClick={enterFullScreen}>Full Screen</Button>
      </Box>
    </Box>
  );
}
