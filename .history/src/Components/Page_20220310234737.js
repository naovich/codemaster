import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import Code from "../prism/Code";
import Code2 from "../prism/Code2";
import "../prism/styles.css";
import { db, getDataByOrder } from "../db/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
  const [code, setCode] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "user");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setCode(snapshot.docs.map((doc) => ({ ...doc.data() })))
    );
  }, []);

  /*
  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(collectionRef, orderBy("order", "desc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setCode(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
*/
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
          {code.map((x) => (
            <li style={{ cursor: "pointer" }} key={code.uid}>
              {x.title}
            </li>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
