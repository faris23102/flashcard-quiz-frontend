// app/MuiWrapper.js
'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function MuiWrapper({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
}
