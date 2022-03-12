import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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
      <Button>Hello</Button>
    </Box>
  );
}

export default Page;
