import Prettier from "prettier";

export const format = prettier.format("foo ( );", {
  semi: false,
  parser: "babel",
});
console.log(format);
// -> "foo()"
