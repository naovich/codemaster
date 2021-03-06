import React, { useRef, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Divider, Stack, Typography } from "@mui/material";

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

function Code({ code, comment, title, cathegorie }) {
  let formatCode = code.trim();
  formatCode.replace(";", "xxx");

  const [codes, setCodes] = useState(formatCode);
  const codeRef = useRef();
  const commentRef = useRef();
  function updateComment() {
    setCodes(codeRef.current.value);
  }

  function updateCode() {
    setCodes(codeRef.current.value);
  }

  return (
    <>
      <Typography align="left" color="white" variant="h5">
        {title}
      </Typography>
      <Stack direction="row" sx={{ maxHeight: 500, width: 850 }}>
        <Highlight {...defaultProps} theme={theme} code={codes} language="jsx">
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

export function UpdateCode({ code, comment }) {
  const [codes, setCodes] = useState();
  const codeRef = useRef();
  const commentRef = useRef();

  function updateCode() {
    setCodes(codeRef.current.value);
  }
  return (
    <div>
      <textarea
        style={{ margin: 10, width: "800px" }}
        rows={5}
        cols={3}
        ref={commentRef}
        value={comment}
        onChange={updateCode}
      />
    </div>
  );
}
