import React from 'react'
import { Box } from "@mui/material";
import Sidebar from "./layout/sidebar";
import CanvasLayout from "./layout/canvas";

/*************  ✨ Codeium Command 🌟  *************/
/**
 * The main application component, rendering the sidebar and canvas layout.
 *
 * @return {JSX.Element} The JSX element representing the application.
 */
function App() {

  return (
    <Box className="h-full w-full">
      <Sidebar />
      <CanvasLayout />
    </Box>
  );
}

export default App
