import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box, createTheme } from "@mui/system";

import React, { useEffect, useRef, useState } from "react";
import Code, { UpdateCode } from "../prism/Code";
import { db, getDataBydocId } from "../db/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import ConfirmDialog from "./ConfirmDialog";

const codePostInit = {
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
    label: "React Native",
    keyId: "reactnative",
    index: 0,
  },
  {
    label: "C#",
    keyId: "csharp",
    index: 1,
  },
  {
    label: "Dart",
    keyId: "dart",
    index: 2,
  },
  {
    label: "PHP",
    keyId: "php",
    index: 3,
  },
  {
    label: "MySql",
    keyId: "mysql",
    index: 4,
  },
  {
    label: "CI/CD",
    keyId: "cicd",
    index: 5,
  },
];

function Main() {
  //------------- Initialisation ---------------

  const [lang, setLang] = useState("note");
  const [codeTitle, setCodeTitle] = useState([]);
  const [codePost, setCodePost] = useState(codePostInit);
  const [lastCategory, setLastCategory] = useState("");

  const [filter, setFilter] = useState("");
  const filterRef = useRef();

  //------ Chargement des données de départ  ---------

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(
      collectionRef,
      where("lang", "==", lang),
      orderBy("category", "asc"),
      orderBy("title", "asc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) =>
        setCodeTitle(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        ),
      gotoPost("0wtSF6ovkHlPQ3Y3gFMH")
    );
  }, [lang]);

  //------ Chargement des données de post  ---------

  /* 
    const gotoPost = async (value) => {
    const data = await getDataBydocId("codes", value);
    setCodePost({ ...data, id: data.id });
  };
*/
  const gotoPost = async (value) => {
    const docRef = doc(db, "codes", value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCodePost({ ...docSnap.data(), id: docSnap.id });
      // console.log(codePost);
    }
  };
  //-------------------   Change langue -------------------
  function changeLang(langId) {
    setLang(langId);
  }

  //-------------------   Filtre -------------------

  function filterMe() {
    const find = new RegExp(filterRef.current.value, "i"); // correct way
    setFilter(find);
  }
  const lastCat = "";
  //--------------------- RENDER --------------------

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={2} sm={2} lg={1} item Stack>
          <Divider />
          <List>
            {webLang.map((x, index) => (
              <ListItem
                onClick={() => changeLang(x.keyId)}
                button
                key={x.keyId}
              >
                <ListItemText primary={x.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {otherLang.map((x, index) => (
              <ListItem
                onClick={() => changeLang(x.keyId)}
                button
                key={x.keyId}
              >
                <ListItemText primary={x.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {devops.map((x, index) => (
              <ListItem
                onClick={() => changeLang(x.keyId)}
                button
                key={x.keyId}
              >
                <ListItemText primary={x.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem onClick={() => changeLang("note")} button key="note">
              <ListItemText primary="Notes" />
            </ListItem>
          </List>
        </Grid>
        <Grid className="scol" item xs={8} sm={2} lg={2} sx={theme.firstCol}>
          <Stack>
            <input
              ref={filterRef}
              onChange={filterMe}
              type="text"
              placeholder="Recherche..."
              style={{ marginBottom: 10 }}
            />

            {filter == ""
              ? codeTitle.map((x) =>
                  x.title.match(/^-/) ? (
                    <Button
                      key={x.id}
                      onClick={() => gotoPost(x.id)}
                      size="small"
                      variant="contained"
                      color={x.category.match(/^-/) ? "secondary" : "primary"}
                    >
                      {x.title.slice(1)}
                    </Button>
                  ) : (
                    <Button
                      key={x.id}
                      onClick={() => gotoPost(x.id)}
                      size="small"
                    >
                      {x.title}
                    </Button>
                  )
                )
              : codeTitle.map(
                  (x) =>
                    x.title.match(filter) &&
                    (x.title.match(/^-/) ? (
                      <Button
                        key={x.id}
                        onClick={() => gotoPost(x.id)}
                        size="small"
                        variant="contained"
                        color={x.category.match(/^-/) ? "secondary" : "primary"}
                      >
                        {x.title.slice(1)}
                      </Button>
                    ) : (
                      <Button
                        key={x.id}
                        onClick={() => gotoPost(x.id)}
                        size="small"
                      >
                        {x.title}
                      </Button>
                    ))
                )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} lg={6}>
          <Box sx={theme.mainCol}>
            <Stack direction="row">
              <Stack sx={theme.titles}>
                <Typography variant="span">
                  <b>Title :</b> {codePost.title}
                </Typography>
                <Typography variant="span">
                  <b>Catégorie :</b> {codePost.category}
                </Typography>
                <Typography variant="span">Dépendences : * </Typography>
              </Stack>

              <Stack sx={theme.titles}>
                <Typography variant="span">Modification : *</Typography>
                <Typography variant="span">Création : *</Typography>
              </Stack>

              <Stack>
                <Typography variant="span">Testé : * </Typography>
              </Stack>
            </Stack>

            <Stack sx={theme.codeBox}>
              <Code
                key={codePost.id}
                code={codePost.code}
                comment={codePost.id}
                title={codePost.title}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} lg={3} sx={theme.lastCol}>
          <UpdateCode
            lang={codePost.lang}
            category={codePost.category}
            title={codePost.title}
            code={codePost.code}
            comment={codePost.comment}
            idPost={codePost.id}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Main;

const theme = {
  firstCol: {
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
    height: "85vh",
    overflow: "scroll",
  },
  mainCol: {
    border: "solid 1px lightgrey",
    padding: 1,
    height: "85vh",
    overflow: "scroll",
  },
  titles: {
    marginRight: 5,
  },
  codeBox: {
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
    backgroundColor: "#011627",
  },

  lastCol: {
    border: "solid 1px lightgrey",
    borderLeft: "0px",
    padding: 1,
    marginTop: 2,
    height: "85vh",
    overflow: "scroll",
  },
  search: {},
};
