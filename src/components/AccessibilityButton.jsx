import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Fab, Paper } from "@mui/material";

// Icons
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import ContrastIcon from "@mui/icons-material/Contrast";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import RestoreIcon from "@mui/icons-material/Restore";
import { Modal, Typography } from "@mui/material";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%", // Adjust width as needed
  maxHeight: "90vh", // Ensure the modal does not exceed viewport height
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  overflow: "auto",
  p: 4,
};

const AccessibilityButton = () => {
  const underlineOptions = [
    "Contrast",
    "Saturation",
    "Bigger Text",
    "Text Spacing",
    "Line Height",
    "Text Align",
    "Word Spacing",
  ];
  const [open, setOpen] = React.useState(false);
  const [isCustomCursor, setIsCustomCursor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [underlineStates, setUnderlineStates] = useState(
    Array(underlineOptions.length).fill(0)
  );
  const [textAlign, setTextAlign] = useState("left");
  const [pageStructure, setPageStructure] = useState([]);
  const [isScreenReaderActive, setScreenReaderActive] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleOpen = () => {
    extractPageStructure();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const extractPageStructure = () => {
    const relevantTags = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "button",
    ];
    const content = Array.from(
      document.body.querySelectorAll(relevantTags.join(","))
    );

    const structure = content.map((element) => ({
      tag: element.tagName,
      text: element.innerText || element.alt || "",
      attributes:
        element.tagName === "a" ? { href: element.getAttribute("href") } : null,
    }));

    setPageStructure(structure);
  };

  const icons = {
    "Screen Reader": <SpatialAudioIcon />,
    Contrast: <ContrastIcon />,
    Saturation: <InvertColorsIcon />,
    "Bigger Text": <TextFieldsIcon />,
    "Text Spacing": <SpaceBarIcon />,
    "Line Height": <FormatLineSpacingIcon />,
    "Bigger Cursor": <AdsClickIcon />,
    "Text Align": {
      left: <FormatAlignLeftIcon />,
      center: <FormatAlignCenterIcon />,
      right: <FormatAlignRightIcon />,
    },
    "Word Spacing": <FormatLineSpacingIcon />,
    "Site Map": <FormatLineSpacingIcon />,
    "Reset Options": <RestoreIcon />,
  };

  const updateGlobalStyles = () => {
    const biggerTextState = underlineStates[2]; // Index for "Text Spacing"
    const textSpacingState = underlineStates[3]; // Index for "Text Spacing"
    const lineHeightState = underlineStates[4]; // Index for "Line Height"
    const textAlignState = underlineStates[5]; // Index for "Text Align"
    const wordSpacingState = underlineStates[6]; // Index for "Text Align"
    const contrastState = underlineStates[0]; // Index for "Text Align"

    // Apply Text Spacing
    const textSpacing =
      textSpacingState === 0
        ? "normal"
        : textSpacingState === 1
        ? "0.12em"
        : "0.25em";
    document.documentElement.style.setProperty("--text-spacing", textSpacing);

    // Apply Line Height
    const lineHeight =
      lineHeightState === 0 ? "1.5" : lineHeightState === 1 ? "1.75" : "2";
    document.documentElement.style.setProperty("--line-height", lineHeight);

    // Apply Text Align
    const textAlign =
      textAlignState === 0 ? "left" : textAlignState === 1 ? "center" : "right";
    document.documentElement.style.setProperty("--text-align", textAlign);

    // Apply Bigger Text
    if (biggerTextState === 0) {
      document.documentElement.style.setProperty("--bigger-text", "initial");
    } else {
      const biggerText = biggerTextState === 1 ? "1.25em" : "1.5em";
      document.documentElement.style.setProperty("--bigger-text", biggerText);
    }

    // Apply Word Spacing
    const wordSpacing =
      wordSpacingState === 0
        ? "normal"
        : wordSpacingState === 1
        ? "0.16em"
        : "0.2em";
    document.documentElement.style.setProperty("--word-spacing", wordSpacing);

    // Cursor
    const cursor = isCustomCursor ? "url('/cursor.svg') -30 0, auto" : "auto";
    document.documentElement.style.setProperty("--cursor", cursor);

    // Apply Contrast
    const contrastFilter =
      contrastState === 0
        ? "none"
        : contrastState === 1
        ? "contrast(1.5)"
        : "invert(1)";
    document.documentElement.style.filter = contrastFilter;
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!isScreenReaderActive) return;

      window.speechSynthesis.cancel();

      const text =
        event.target.innerText || event.target.alt || "No readable content";

      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    };

    if (isScreenReaderActive) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
      window.speechSynthesis.cancel();
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.speechSynthesis.cancel();
    };
  }, [isScreenReaderActive]);

  useEffect(() => {
    updateGlobalStyles();
  }, []);

  useEffect(() => {
    updateGlobalStyles();
  }, [underlineStates]);

  // Replace if statements with switch case perhaps?
  const handleMenuItemClick = (text) => {
    const index = underlineOptions.indexOf(text);

    if (text === "Contrast") {
      setIsHighContrast((prev) => !prev);
      setUnderlineStates((prev) =>
        prev.map((state, i) => (i === index ? (state + 1) % 3 : state))
      );
    } else if (text === "Text Align") {
      setTextAlign((prev) =>
        prev === "left" ? "center" : prev === "center" ? "right" : "left"
      );
      setUnderlineStates((prev) =>
        prev.map((state, i) => (i === index ? (state + 1) % 3 : state))
      );
    } else if (index !== -1) {
      setUnderlineStates((prev) =>
        prev.map((state, i) => (i === index ? (state + 1) % 3 : state))
      );
    } else if (text === "Bigger Cursor") {
      setIsCustomCursor((prev) => !prev);
      setUnderlineStates((prev) =>
        prev.map((state, i) => (i === index ? (state + 1) % 3 : state))
      );
    } else if (text === "Site Map") {
      handleOpen();
    } else if (text === "Screen Reader") {
      setScreenReaderActive((prev) => {
        if (prev) {
          window.speechSynthesis.cancel();
        }
        return !prev;
      });
    }
  };

  const LineContainer = ({ activeIndex }) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            height: "3px",
            width: "30%",
            backgroundColor: activeIndex === i ? "green" : "grey",
          }}
        />
      ))}
    </div>
  );

  const list = (
    <Box role="presentation">
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        {[
          ...underlineOptions,
          "Screen Reader",
          "Bigger Cursor",
          "Site Map",
          "Reset Options",
        ].map((text) => {
          const index = underlineOptions.indexOf(text);
          const hasUnderline = index !== -1;

          return (
            <Paper
              key={text}
              elevation={1}
              sx={{
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <ListItem disablePadding sx={{ width: "100%" }}>
                <ListItemButton
                  onClick={() => handleMenuItemClick(text)}
                  sx={{
                    padding: 0,
                    minHeight: "48px",
                  }}
                >
                  <ListItemIcon>
                    {text === "Text Align"
                      ? icons[text][textAlign]
                      : icons[text]}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="sideMenuText"
                          sx={{
                            lineHeight: "1.5",
                            padding: 0,
                          }}
                        >
                          {text}
                        </Typography>
                        {hasUnderline && (
                          <LineContainer activeIndex={underlineStates[index]} />
                        )}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleDrawer(true)}
        sx={{ position: "absolute", right: "30px", top: "50%" }}
      >
        <SettingsAccessibilityIcon sx={{ fontSize: 30 }} />
      </Fab>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
        BackdropProps={{ invisible: true }}
      >
        {list}
      </Drawer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Page Structure
          </Typography>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
            }}
          >
            {pageStructure.map((content, idx) => (
              <li key={idx}>
                <ul>
                  <ListItem key={`item-${idx}`}>
                    {/* <ListItemText primary={`${content.tag}: ${content.text}`} /> */}
                    <Typography variant="p">{`${content.tag}: ${content.text}`}</Typography>
                  </ListItem>
                </ul>
              </li>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default AccessibilityButton;
