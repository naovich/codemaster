import { Button, Stack, Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import { where } from "firebase/firestore";
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
  const [codeTitle, setCodeTitle] = useState([]);
  const [filter, setFilter] = useState("");
  const filterRef = useRef();

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(
      collectionRef,
      where("lang", "=", "javascript"),
      orderBy("order", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setCodeTitle(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  function gotoPost(id) {
    console.log(id);
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack sx={theme.firstCol} direction="column">
        <input search type="text" placeholder="Recherche..." />

        <Typography align="center" variant="h6">
          <Button size="large" color="secondary">
            Tableau
          </Button>
        </Typography>
        {codeTitle.map((x) => (
          <Button onClick={() => gotoPost(x.id)} size="small">
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
