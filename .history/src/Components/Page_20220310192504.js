import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";

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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Button variant="contained">Hello</Button>
          <Button variant="contained">You</Button>
        </Stack>
        <Stack>
          <pre>
            <code>
              <html>gt</html>
            </code>
          </pre>
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
