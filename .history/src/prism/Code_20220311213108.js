import React, { useRef, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Button, Divider, Stack, Typography } from "@mui/material";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

function Code({ code }) {
  let formatCode = code.trim();
  formatCode.replace(";", "xxx");

  const [codes, setCodes] = useState(formatCode);
  const codeRef = useRef();
  const commentRef = useRef();

  function updateComment() {
    setCodes(codeRef.current.value);
  }

  return (
    <>
      <Typography align="left" color="white" variant="h5"></Typography>
      <Stack direction="row" sx={{ height: 920, width: 782 }}>
        <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      </Stack>
    </>
  );
}

export default Code;

export function UpdateCode({ code, comment, lang, category, title }) {
  const cCode = code;

  const [codes, setCodes] = useState();
  const [isNew, setIsNew] = useState(false);

  const codeRef = useRef();
  const commentRef = useRef();

  const titleRef = useRef();
  const langRef = useRef();
  const categoryRef = useRef();

  function updateCode({ lang, category, title }) {
    //setCodes(codeRef.current.value);
    codeRef.current.value = "111";
  }

  function newPost() {
    setIsNew(true);
    // codeRef.current.value = "";
    // titleRef.current.value = "";
    console.log(titleRef.current.value);
  }

  function cancelPost() {
    setIsNew(false);
    // codeRef.current.value = code;
    //titleRef.current.value = title;
  }

  return (
    <Stack>
      <Stack direction="row">
        <Stack sx={theme2.titles}>
          <Typography variant="span">Langage :{lang}</Typography>
          <Typography variant="span">Cathégorie : {category} </Typography>
          <Typography variant="span">Titre : {title} </Typography>
        </Stack>

        <Stack sx={theme2.titles}>
          <label>
            <input
              onChange={console.log("filter change")}
              ref={langRef}
              type="text"
              value={lang}
            />
          </label>
          <label>
            <input ref={categoryRef} type="text" value={category} />
          </label>
          <label>
            <input ref={titleRef} type="text" value={title} />
          </label>
        </Stack>
      </Stack>

      <textarea
        style={{ margin: 5, width: "500px" }}
        rows={30}
        cols={3}
        defaultValue={cCode}
        onChange={updateCode}
      />
      <Stack direction="row" spacing={3}>
        {isNew ? (
          <>
            <Button variant="contained" color="primary">
              Enregister
            </Button>
            <Button onClick={cancelPost} variant="contained" color="secondary">
              Annuler
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary">
              Modifier
            </Button>
            <Button variant="contained" color="secondary">
              Supprimer
            </Button>
            <Button onClick={newPost} variant="contained" color="primary">
              Nouveau
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}

const theme2 = {
  titles: {
    marginRight: 5,
  },
};
