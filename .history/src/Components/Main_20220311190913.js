import { Button, Stack, Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";

import React, { useEffect, useRef, useState } from "react";
import Code, { UpdateCode } from "../prism/Code";
import { db, getDataBydocId } from "../db/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

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
  //--------------- Initialisation -----------------

  const [lang, setLang] = useState("javascript");
  const [codeTitle, setCodeTitle] = useState([]);
  const [filter, setFilter] = useState("");
  const [codePost, setCodePost] = useState("");

  const filterRef = useRef();

  //------ Chargement des données de départ  ---------

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(
      collectionRef,
      where("lang", "==", lang),
      orderBy("order", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setCodeTitle(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  //------ Chargement onClick  ---------

  function gotoPost(id) {
    // setCodePost(getDataBydocId("codes", id));
    console.log(id);
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack sx={theme.firstCol} direction="column">
        <input
          onChange={console.log("filter change")}
          type="text"
          placeholder="Recherche..."
        />

        <Typography align="center" variant="h6">
          <Button size="large" color="secondary">
            Tableau
          </Button>
        </Typography>
        {codeTitle.map((x) => (
          <Button key={x.id} onClick={() => gotoPost(x.id)} size="small">
            {x.title}
          </Button>
        ))}
      </Stack>

      <Stack direction="column">
        <Box sx={theme.mainCol}>
          <Stack direction="row">
            <Stack sx={theme.titles}>
              <Typography variant="span">Title: {x.title}</Typography>
              <Typography variant="span">Cathegorie: {x.category} </Typography>
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
            <Code key={x.id} code={x.code} comment={x.id} title={x.title} />
          </Stack>
        </Box>
      </Stack>

      <Stack sx={theme.lastCol} direction="column">
        <UpdateCode lang={x.lang} category={x.category} title={x.title} />
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
