import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Stack } from "@mui/material";

function FilterMenu({ codeTitle, gotoPost }) {
  const filterRef = useRef();
  const [filter, setFilter] = useState("");

  //-------------------   Filtre -------------------

  function filterMe() {
    const find = new RegExp(filterRef.current.value, "i"); // correct way
    setFilter(find);
  }
  return (
    <Stack>
      <input
        ref={filterRef}
        onChange={filterMe}
        type="text"
        placeholder="Recherche..."
        style={{ marginBottom: 10 }}
      />

      {filter === ""
        ? codeTitle.map((x) =>
            x.title.match(/^-/) ? (
              <Button
                key={x.id}
                onClick={() => gotoPost(x.id)}
                size="small"
                variant="contained"
                color={x.category.match(/^-/) ? "secondary" : "primary"}
              >
                {x.title.slice(1)}
              </Button>
            ) : (
              <Button key={x.id} onClick={() => gotoPost(x.id)} size="small">
                {x.title}
              </Button>
            )
          )
        : codeTitle.map(
            (x) =>
              x.title.match(filter) &&
              (x.title.match(/^-/) ? (
                <Button
                  key={x.id}
                  onClick={() => gotoPost(x.id)}
                  size="small"
                  variant="contained"
                  color={x.category.match(/^-/) ? "secondary" : "primary"}
                >
                  {x.title.slice(1)}
                </Button>
              ) : (
                <Button key={x.id} onClick={() => gotoPost(x.id)} size="small">
                  {x.title}
                </Button>
              ))
          )}
    </Stack>
  );
}

FilterMenu.propTypes = {
  codeTitle: PropTypes.array.isRequired,
  gotoPost: PropTypes.func.isRequired,
};

export default FilterMenu;
