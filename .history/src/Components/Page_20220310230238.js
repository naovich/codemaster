import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import Code from "../prism/Code";
import Code2 from "../prism/Code2";
import "../prism/styles.css";

const exampleCode = `
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`;

function Page() {
  return (
    <Box
      className="App"
      sx={{
        display: "flex",

        backgroundColor: "#2D2D2D",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
      }}
    >
      <Box>
        <Stack>
          <Code script={exampleCode} comment="comment" title="Title 1" />
          <Code script={exampleCode} />
          <Code script={exampleCode} />
          <Code script={exampleCode} />
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
