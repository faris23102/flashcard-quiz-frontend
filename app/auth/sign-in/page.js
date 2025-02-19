// app/auth/sign-in/page.js
'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React, { Suspense, useState } from 'react';
import { signIn } from "next-auth/react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}
