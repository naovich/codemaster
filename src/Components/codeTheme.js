import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";

export const rodyDavisTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#263E52",
    foreground: "#EAF8F2",
    caret: "#5d00ff",
    //selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#666666",
    gutterForeground: "#ffffff",
  },
  styles: [
    { tag: t.comment, color: "#327DCD" },
    { tag: t.variableName, color: "#66D8EF" },
    { tag: [t.string, t.special(t.brace)], color: "#FCFCD6" },
    { tag: t.number, color: "#BC94F9" },
    { tag: t.bool, color: "#BC94F9" },
    { tag: t.null, color: "#5c6166" },
    { tag: t.keyword, color: "#6EB265" },
    { tag: t.operator, color: "#5c6166" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#F8F8F2" },
    { tag: t.tagName, color: "#BB545D" },
    { tag: t.attributeName, color: "#FCFCD6" },
  ],
});
export const vsCodeTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#1e1e1e",
    foreground: "#EAF8F2",
    caret: "#5d00ff",
    // selection: "#036dd6",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#1e1e1e",
    gutterForeground: "#c1c6c6",
    gutterBorder: "#ffffff",
  },
  styles: [
    { tag: t.comment, color: "#6a9955" },
    { tag: t.variableName, color: "#dcdcaa" },
    { tag: [t.string, t.special(t.brace)], color: "#ce9178" },
    { tag: t.number, color: "#b5cea8" },
    { tag: t.bool, color: "#569cd6" },
    { tag: t.null, color: "#5c6166" },
    { tag: t.keyword, color: "#569cd6" },
    { tag: t.operator, color: "#ffffff" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.name), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#F8F8F2" },
    { tag: t.tagName, color: "#BB545D" },
    { tag: t.attributeName, color: "#FCFCD6" },
  ],
});
