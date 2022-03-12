import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../prism/styles.css";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code
          style={{ backgroundColor: "black" }}
          className={`language-${language}`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
