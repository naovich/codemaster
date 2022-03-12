import React, { useRef, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Stack, Typography } from "@mui/material";

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

function Code({ script }) {
  const s2 = script.trim();
  const [code, setCode] = useState(s2);
  const areaRef = useRef();

  function updateCode() {
    setCode(areaRef.current.value);
  }

  return (
    <>
      <Typography align="left" color="white" variant="h5">
        Titre
      </Typography>
      <Stack direction="row" sx={{ minHeight: 200, maxHeight: 500 }}>
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

        <textarea
          style={{ margin: 10 }}
          rows={20}
          cols={70}
          ref={areaRef}
          onChange={updateCode}
        >
          {code}
        </textarea>
      </Stack>
    </>
  );
}

export default Code;
