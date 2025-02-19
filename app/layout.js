'use client';

import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import { Box } from '@mui/material';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function RootLayout({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
      }),
    [mode]
  );

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* 1) Render NavBar once at the very top (fixed-position) */}
              <NavBar />

              {/* 2) Push content down by ~80px to avoid overlap with fixed NavBar */}
              <Box sx={{ pt: '80px' }}>
                {children}
              </Box>

              {/* 3) Render Footer at the bottom */}
              <Footer />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
