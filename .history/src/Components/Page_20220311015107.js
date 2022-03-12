import React, { useEffect, useRef, useState } from "react";
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
      <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
  );
}
`;

function Page() {
  const [code, setCode] = useState([]);
  const [filter, setFilter] = useState("Mon");
  const filterRef = useRef();

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(collectionRef, orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setCode(snapshot.docs.map((doc) => ({ ...doc.data() })))
    );
  }, []);

  function filterMe() {
    setFilter(filterRef.current.value);
  }

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
          <input ref={filterRef} type="text" onChange={filterMe} />
          {filter == ""
            ? code.map((x) => (
                <Code
                  key={x.date.toString()}
                  code={x.code
                    .replaceAll(/\s\s+/g, " ")
                    .replaceAll(";", "; \n \t")
                    .replaceAll(",", ", \n \t")
                    .replaceAll(">", "> \n \t")
                    .replaceAll("return (", "return ( \n \t")
                    .replaceAll(/\s\s}+/g, "}")
                    .trim()}
                  comment={x.comment}
                  title={x.title}
                />
              ))
            : code.map(
                (x) =>
                  x.title.match(filter) && (
                    <Code
                      key={x.date.toString()}
                      code={x.code
                        .replaceAll(/\s\s+/g, " ")
                        .replaceAll(";", "; \n \t")
                        .replaceAll(",", ", \n \t")
                        .replaceAll(">", "> \n \t")
                        .replaceAll("return (", "return ( \n \t")
                        .replaceAll(/\s\s}+/g, "}")
                        .trim()}
                      comment={x.comment}
                      title={x.title}
                    />
                  )
              )}
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
