import PropTypes from "prop-types";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";

function LeftMenu({ onChangeLang }) {
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
      label: "Typescript",
      keyId: "typescript",
      index: 3,
    },
    {
      label: "ReactJS",
      keyId: "reactjs",
      index: 4,
    },
    {
      label: "ReactJS beta",
      keyId: "reactjs2",
      index: 5,
    },
    {
      label: "Next.js",
      keyId: "nextjs",
      index: 6,
    },
    {
      label: "VueJs",
      keyId: "vuejs",
      index: 7,
    },
    {
      label: "Augular",
      keyId: "augular",
      index: 8,
    },
    {
      label: "Test",
      keyId: "test",
      index: 9,
    },
    {
      label: "NodeJS",
      keyId: "nodejs",
      index: 10,
    },
    {
      label: "NOSQL",
      keyId: "nosql",
      index: 11,
    },
    {
      label: "Firebase",
      keyId: "firebase",
      index: 12,
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
  ];

  const devops = [
    {
      label: "DevOps",
      keyId: "devops",
      index: 0,
    },
    {
      label: "CI/CD",
      keyId: "cicd",
      index: 1,
    },
    {
      label: "GIT",
      keyId: "git",
      index: 2,
    },
    {
      label: "Projet",
      keyId: "projet",
      index: 3,
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
