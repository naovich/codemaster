import { Stack } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";

function Main() {
  return (
    <Stack direction="row" spacing={10}>
      <Stack direction="column">
        <Box sx={theme.firstCol}>
          <h5>Tableau</h5>
          <span>Split</span>
          <span>replace</span>
          <span>map</span>
          <span>filter</span>
        </Box>
      </Stack>

      <Stack direction="column">
        <Box sx={{}}></Box>
      </Stack>
    </Stack>
  );
}

export default Main;

const theme = {
  firstCol: {
    height: "100%",
    backgroundColor: "primary",
  },
};
