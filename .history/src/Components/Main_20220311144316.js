import { Stack } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";

function Main() {
  return (
    <Stack direction="row" spacing={10}>
      <Stack sx={theme.firstCol} direction="column">
        <h5>Tableau</h5>
        <span>Split</span>
        <span>replace</span>
        <span>map</span>
        <span>filter</span>
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
    height: 500,
    width: 150,
    backgroundColor: "lightblue",
    padding: 3,
  },
};
