import React from "react";
import Box from "@mui/material/Box";

function Page() {
  return (
    <Box
      sx={{
        width: 1920,
        height: 1000,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    ></Box>
  );
}

export default Page;
