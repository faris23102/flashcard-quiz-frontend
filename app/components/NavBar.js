// app/components/NavBar.js
'use client';

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useSession, signIn, signOut } from "next-auth/react";
import { ColorModeContext } from "../layout";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { data: session } = useSession();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // Check current route
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // By default, the NavBar on the home page is slightly tinted (not fully transparent).
  // On scroll, we darken it further.
  const [scrollBg, setScrollBg] = useState(
    isHomePage ? "rgba(0,0,0,0.2)" : "#fff"
  );
  const [scrollShadow, setScrollShadow] = useState(
    isHomePage ? "none" : "0 2px 4px rgba(0,0,0,0.1)"
  );

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollBg("rgba(0, 0, 0, 0.4)");
        setScrollShadow("0 4px 8px rgba(0,0,0,0.1)");
      } else {
        setScrollBg("rgba(0,0,0,0.2)");
        setScrollShadow("none");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // If not home page, NavBar is solid white with dark text
  const backgroundColor = isHomePage ? scrollBg : "#fff";
  const boxShadow = isHomePage ? scrollShadow : "0 2px 4px rgba(0,0,0,0.1)";
  const backdropFilter =
    isHomePage && scrollBg !== "transparent" ? "blur(6px)" : "none";

  // Text color: white on home page, dark on other pages
  const textColor = isHomePage ? "#f0f0f0" : "#333";

  // Common styles for nav buttons
  const navButtonStyles = {
    color: textColor,
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      backgroundColor: isHomePage
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 0, 0, 0.05)",
      color: isHomePage ? "#fff" : "#000",
    },
  };

  // Icon color for theme toggle
  const iconColor = { color: textColor };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor,
        boxShadow,
        backdropFilter,
        transition:
          "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 70,
        }}
      >
        {/* Left side: Logo + Brand Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* 
            1) Rename your image file to 'logo_for_quizmo.jpg' (no spaces).
            2) Place it in /public/
            3) Reference it below:
          */}
          <Image
            src="/logo_for_quizmo.jpg"
            alt="Quizmo Logo"
            width={36}
            height={36}
            style={{ borderRadius: 4 }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", cursor: "pointer", color: textColor }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Flashcard Quiz
            </Link>
          </Typography>
        </Box>

        {/* Right side: Nav Links + Theme Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button sx={navButtonStyles}>Home</Button>
          </Link>
          <Link href="/library" style={{ textDecoration: "none" }}>
            <Button sx={navButtonStyles}>Library</Button>
          </Link>
          {session && (
            <Link href="/create-quiz" style={{ textDecoration: "none" }}>
              <Button sx={navButtonStyles}>Create New Quiz</Button>
            </Link>
          )}
          {session ? (
            <Button onClick={() => signOut()} sx={navButtonStyles}>
              Sign Out
            </Button>
          ) : (
            <Button onClick={() => signIn()} sx={navButtonStyles}>
              Sign In
            </Button>
          )}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={iconColor} />
            ) : (
              <Brightness4Icon sx={iconColor} />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
