import { useState } from "react";
import "./App.css";
import AccessibilityButton from "./components/AccessibilityButton.jsx";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "var(--bigger-text, 96px)",
      lineHeight: "var(--line-height, 1.5)",
      wordSpacing: "var(--word-spacing, normal)",
      letterSpacing: "var(--text-spacing, normal)",
    },
    body1: {
      fontSize: "var(--bigger-text, 1em)",
      lineHeight: "var(--line-height, 1.5)",
      wordSpacing: "var(--word-spacing, normal)",
      letterSpacing: "var(--text-spacing, normal)",
    },
    sideMenuText: {
      fontSize: "16px",
      lineHeight: "1.5",
      wordSpacing: "normal",
      letterSpacing: "normal",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1 id="h1-0">Heading</h1>

      <p id="p-1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <AccessibilityButton />
      <Typography variant="h1">
        This is a heading with dynamic font size
      </Typography>
      <Typography variant="body1">Body 1</Typography>
      <Typography variant="body2">Body 2</Typography>
    </ThemeProvider>
  );
}

export default App;
