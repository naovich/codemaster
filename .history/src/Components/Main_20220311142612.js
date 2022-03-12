import { Stack } from "@mui/material";
import React from "react";

function Main() {
  return (
    <Stack direction="row" spacing={10}>
      <Stack direction="column">
        <h5>Tableau</h5>
        <span>Split</span>
        <span>replace</span>
        <span>map</span>
        <span>filter</span>
      </Stack>

      <Stack direction="column">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </Stack>
    </Stack>
  );
}

export default Main;
