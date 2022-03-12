import React, { useEffect } from "react";
/*import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../prism/styles.css";*/
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

export default function Code({ code, language }) {
  return (
    <Highlight {...defaultProps} code={exampleCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
