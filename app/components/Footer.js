// app/components/Footer.js
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  const [year, setYear] = useState("2025");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Box sx={{ py: 4, backgroundColor: 'primary.main', color: '#fff', mt: 4 }}>
      <Container>
        <Typography variant="h6" gutterBottom>
          Flashcard Quiz Creator
        </Typography>
        <Typography variant="body2">
          Create engaging and interactive quiz videos effortlessly.
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            © {year} Flashcard Quiz Creator. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
