import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import Code from "../prism/Code";
import Code2 from "../prism/Code2";
import "../prism/styles.css";
import { db, getDataByOrder } from "../db/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";

const Label = styled("label")({
  display: "block",
});

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

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(collectionRef, orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setCode(snapshot.docs.map((doc) => ({ ...doc.data() })))
    );
  }, []);

  const Input = styled("input")(({ theme }) => ({
    width: 200,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
  }));

  const Listbox = styled("ul")(({ theme }) => ({
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
    },
  }));

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

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
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>useAutocomplete</Label>
          <Input {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.title}</li>
            ))}
          </Listbox>
        ) : null}
      </div>

      <Box>
        <Stack>
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
