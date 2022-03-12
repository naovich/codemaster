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
  code = code.trim();
  code.replace(";", "; \n kk");
  const [codes, setCodes] = useState(code);
  const codeRef = useRef();
  const commentRef = useRef();

  function updateCode() {
    setCodes(codeRef.current.value);
  }

  return (
    <>
      <Typography align="left" color="white" variant="h5">
        {title}
      </Typography>
      <Stack direction="row" sx={{ maxHeight: 500, minWidth: 200 }}>
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

        <textarea
          style={{ margin: 10 }}
          rows={20}
          cols={70}
          ref={codeRef}
          onChange={updateCode}
        >
          {codes}
        </textarea>
      </Stack>
      <textarea style={{ margin: 10 }} rows={5} cols={3} ref={commentRef}>
        {comment}
      </textarea>
    </>
  );
}

export default Code;
