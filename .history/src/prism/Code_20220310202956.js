import React, { useEffect } from "react";
/*import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../prism/styles.css";*/
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        npm install --save prism-react-renderer
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
