import Prettier from "prettier";

prettier.format("foo ( );", { semi: false, parser: "babel" });
// -> "foo()"
