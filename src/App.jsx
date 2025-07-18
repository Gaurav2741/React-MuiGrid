// src/App.jsx
import React from "react";
import UserGrid from "./components/UserGrid";
import { Box, Typography } from "@mui/material";
function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "20px" }}>
        User Grid
      </Typography>
      <UserGrid />
    </Box>
  );
}
export default App;
