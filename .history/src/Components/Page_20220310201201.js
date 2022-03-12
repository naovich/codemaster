import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import Code from "../prism/Code";
import "../prism/styles.css";

const code = `const App = props => {
  return (
    <div>
      <h1> React App </h1>
      <div>Awesome code</div>
    </div>
  );
};
`;

function Page() {
  return (
    <Box
      className="App"
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
          <Code code={code} language="javascript" />
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
