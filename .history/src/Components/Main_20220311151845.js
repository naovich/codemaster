import { Button, Stack, Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";

function Main() {
  return (
    <Stack direction="row" spacing={10}>
      <Box sx={theme.search}>
        <input type="text" placeholder="Recherche..." />
      </Box>
      <Stack sx={theme.firstCol} direction="column">
        <Typography align="center" variant="h6">
          Tableau
        </Typography>
        <Button>Split</Button>
        <Button>replace</Button>
        <Button>map</Button>
        <Button>filter</Button>
      </Stack>

      <Stack direction="column">
        <Box sx={theme.mainCol}>
          <Stack direction="row">
            <Stack sx={theme.titles}>
              <Typography variant="span">Title: </Typography>
              <Typography variant="span">Cathegorie: </Typography>
              <Typography variant="span">Dépendences: </Typography>
            </Stack>

            <Stack sx={theme.titles}>
              <Typography variant="span">Date de modification:</Typography>
              <Typography variant="span">Date de création:</Typography>
            </Stack>

            <Stack>
              <Typography variant="span">Testé: </Typography>
            </Stack>
          </Stack>
          <Stack sx={theme.codeBox}>Nouveau</Stack>
        </Box>
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
    width: 400,
    height: 600,
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
  },
  firstCol: {
    width: 150,
    border: "solid 1px lightgrey",
    padding: 1,
  },
};
