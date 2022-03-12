import { Button, Stack, Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";

function Main() {
  return (
    <Stack direction="row" spacing={10}>
      <Stack sx={theme.firstCol} direction="column">
        <Typography variant="h5">Tableau</Typography>
        <Button>Split</Button>
        <Button>replace</Button>
        <Button>map</Button>
        <Button>filter</Button>
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
    padding: 1,
  },
};
