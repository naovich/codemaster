import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { Box, createTheme } from "@mui/system";

function LeftMenu({ lang, onChangeLang }) {
  const webLang = [
    {
      label: "HTML",
      keyId: "html",
      index: 0,
    },
    {
      label: "CSS",
      keyId: "css",
      index: 1,
    },
    {
      label: "Vanilla JS",
      keyId: "javascript",
      index: 2,
    },
    {
      label: "ReactJS",
      keyId: "reactjs",
      index: 3,
    },
    {
      label: "NodeJS",
      keyId: "nodejs",
      index: 4,
    },
    {
      label: "Firebase",
      keyId: "firebase",
      index: 5,
    },
  ];

  const otherLang = [
    {
      label: "Algorithme",
      keyId: "algo",
      index: 0,
    },

    {
      label: "React Native",
      keyId: "reactnative",
      index: 1,
    },
    {
      label: "C#",
      keyId: "csharp",
      index: 2,
    },
    {
      label: "Dart",
      keyId: "dart",
      index: 3,
    },
    {
      label: "PHP",
      keyId: "php",
      index: 4,
    },
    {
      label: "MySql",
      keyId: "mysql",
      index: 5,
    },
  ];

  const devops = [
    {
      label: "CI/CD",
      keyId: "cicd",
      index: 0,
    },
    {
      label: "Projet",
      keyId: "projet",
      index: 1,
    },
  ];

  //-------------------   Change langue -------------------
  //------------- Initialisation ---------------

  return (
    <Grid xs={2} sm={2} lg={1} item Stack>
      <Divider />
      <List>
        {webLang.map((x, index) => (
          <ListItem onClick={() => onChangeLang(x.keyId)} button key={x.keyId}>
            <ListItemText primary={x.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {otherLang.map((x, index) => (
          <ListItem onClick={() => onChangeLang(x.keyId)} button key={x.keyId}>
            <ListItemText primary={x.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {devops.map((x, index) => (
          <ListItem onClick={() => onChangeLang(x.keyId)} button key={x.keyId}>
            <ListItemText primary={x.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => onChangeLang("note")} button key="note">
          <ListItemText primary="Notes" />
        </ListItem>
      </List>
    </Grid>
  );
}

LeftMenu.propTypes = {
  lang: PropTypes.string,
  onChangeLang: PropTypes.func,
};

export default LeftMenu;
