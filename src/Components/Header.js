import React from "react";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

function Header({ codePost, theme }) {
  return (
    <Stack direction="row">
      <Stack sx={theme.titles}>
        <Typography variant="span">
          <b>Title :</b> {codePost.title}
        </Typography>
        <Typography variant="span">
          <b>Catégorie :</b> {codePost.category}
        </Typography>
        <Typography variant="span">Dépendences : * </Typography>
      </Stack>

      <Stack sx={theme.titles}>
        <Typography variant="span">Modification : *</Typography>
        <Typography variant="span">Création : *</Typography>
      </Stack>

      <Stack>
        <Typography variant="span">Testé : * </Typography>
      </Stack>
    </Stack>
  );
}

Header.propTypes = {
  theme: PropTypes.object.isRequired,
  codePost: PropTypes.object.isRequired,
};

export default Header;
