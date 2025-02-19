'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // We'll derive callbackUrl from the browser's URL, but only on the client.
  const [callbackUrl, setCallbackUrl] = useState('/');

  useEffect(() => {
    // This code runs only in the browser.
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cb = params.get('callbackUrl') || '/';
      setCallbackUrl(cb);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl });
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
