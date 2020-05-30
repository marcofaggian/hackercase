import React, { useState } from "react";
import rules from "./rules";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import useClippy from "use-clippy";

const App = () => {
  const [statedRules, setStatedRules] = useState(rules);
  const [clipboard, setClipboard] = useClippy();
  let [input, setInput] = useState("");

  let computed = (input || "Enter your text here...").replace(
    new RegExp(Object.keys(statedRules).join("|"), "gi"),
    (matched: string) => (statedRules as any)[matched.toLowerCase()]
  );
  let isInClipboard = clipboard === computed;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          marginTop: "20vh",
          marginBottom: "-54px",
          zIndex: -1,
          color: "rgba(0,0,0,0.15)",
          fontSize: "64px",
        }}
      >
        HackerCase It!
      </h1>
      <h1>H4ck3rC4s3_1t!</h1>

      <h3 style={{ marginBottom: "4px" }}>You can change the rules</h3>
      <div style={{ minWidth: "328px" }}>
        <Editor
          value={statedRules}
          onChange={(v: any) => {
            console.log("ciao", v);
            setStatedRules(v);
          }}
        />
      </div>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
        style={{ marginTop: "24px", minWidth: "320px", minHeight: "32px" }}
      />
      <div style={{ marginTop: "16px" }}>
        <code style={{ marginTop: "16px", marginRight: "4px" }}>
          {computed}
        </code>
        <button onClick={() => setClipboard(computed)} disabled={isInClipboard}>
          {isInClipboard ? "Copyed!" : "Copy to clipboard"}
        </button>
      </div>
    </div>
  );
};

export default App;
