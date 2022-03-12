import {
  Button,
  Divider,
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
    key: "html",
    index: 0,
  },
  {
    label: "CSS",
    key: "css",
    index: 1,
  },
  {
    label: "Vanilla JS",
    key: "javascript",
    index: 2,
  },
  {
    label: "ReactJS",
    key: "reactjs",
    index: 3,
  },
  {
    label: "NodeJSL",
    key: "nodejs",
    index: 4,
  },
  {
    label: "Firebase",
    key: "firebase",
    index: 5,
  },
];

function Main() {
  //------------- Initialisation ---------------

  const [lang, setLang] = useState("javascript");
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
    const unsub = onSnapshot(q, (snapshot) =>
      setCodeTitle(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  //------ Chargement des données de post  ---------

  const gotoPost = async (value) => {
    const docRef = doc(db, "codes", value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCodePost({ ...docSnap.data(), id: docSnap.id });
      // console.log(codePost);
    }
  };

  //-------------------   Filtre -------------------

  function filterMe() {
    const find = new RegExp(filterRef.current.value, "i"); // correct way
    setFilter(find);
  }
  const lastCat = "";
  //--------------------- RENDER --------------------

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Stack direction="column">
          <Divider />
          <List>
            {webLang.map((text, index) => (
              <ListItem button key={text.key}>
                <ListItemText primary={text.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["C#", "Dart", "PHP"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack sx={theme.firstCol} direction="column">
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

        <Stack direction="column">
          <Box sx={theme.mainCol}>
            <Stack direction="row">
              <Stack sx={theme.titles}>
                <Typography variant="span">Title: {codePost.title}</Typography>
                <Typography variant="span">
                  Cathegorie: {codePost.category}{" "}
                </Typography>
                <Typography variant="span">Dépendences: </Typography>
              </Stack>

              <Stack sx={theme.titles}>
                <Typography variant="span">Modification: 18/08/2022</Typography>
                <Typography variant="span">Création: 18/08/2020</Typography>
              </Stack>

              <Stack>
                <Typography variant="span">Testé: </Typography>
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
        </Stack>

        <Stack sx={theme.lastCol} direction="column">
          <UpdateCode
            lang={codePost.lang}
            category={codePost.category}
            title={codePost.title}
            code={codePost.code}
            comment={codePost.comment}
            idPost={codePost.id}
          />
        </Stack>
      </Stack>
    </>
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
    backgroundColor: "#011627",
  },

  lastCol: {
    width: 530,
    height: 705,
    border: "solid 1px lightgrey",
    padding: 1,
  },
  search: {},
};
