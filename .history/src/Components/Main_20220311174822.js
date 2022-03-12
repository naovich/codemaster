import { Button, Stack, Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";
import Code, { UpdateCode } from "../prism/Code";

const x = {
  id: 0,
  title: "Mon titre",
  comment: "comment",
  lang: "javascript",
  category: "Tableau",
  code: `
    import React, { useState } from "react";
    function Example() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>Click me</button> <button onClick={() => setCount(count + 1)}>Click me</button>
          </div>
      );
    }
    `,
};

function Main() {
  return (
    <Stack direction="row" spacing={2}>
      <Stack sx={theme.firstCol} direction="column">
        <input search type="text" placeholder="Recherche..." />

        <Typography align="center" variant="h6">
          <Button size="large" color="secondary">
            Tableau
          </Button>
        </Typography>
        <Button size="small">Split</Button>
        <Button size="small">replace</Button>
        <Button size="small">map</Button>
        <Button size="small"> filter</Button>
      </Stack>

      <Stack sx={theme.lastCol} direction="column">
        <UpdateCode />
      </Stack>
    </Stack>
  );
}

export default Main;

const theme = {
  firstCol: {
    width: 150,
    border: "solid 1px lightgrey",
    padding: 1,
  },
  mainCol: {
    width: 820,
    border: "solid 1px lightgrey",
    padding: 1,
  },
  titles: {
    marginRight: 5,
  },
  codeBox: {
    width: 800,
    height: 600,
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
  },

  lastCol: {
    width: 530,
    height: 705,
    border: "solid 1px lightgrey",
    padding: 1,
  },
  search: {},
};
