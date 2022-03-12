import React from "react";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";

function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        height: 1000,
        backgroundColor: "cyan",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
      }}
    >
      <Box sx={{ height: 20 }}>
        <Stack direction="column" spacing={2}>
          <Button variant="contained">Hello</Button>
          <Button variant="contained">You</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
