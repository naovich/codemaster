import React, { forwardRef } from "react";
import { Button, Stack, Typography } from "@mui/material";

const CrudButton = forwardRef(
  (
    {
      isNew,
      savePost,
      cancelPost,
      isUpdate,
      updateInterface,
      cancelUpdate,
      confirmDelete,
      newPost,
      duplicatePost,
      overideDocById,
      theme,
      lang,
      category,
      title,
    },
    ref
  ) => {
    //const langRef = useRef(null);

    // const titleRef = useRef(null);
    //const categoryRef = useRef(null);
    const { langRef, titleRef, categoryRef } = ref;
    return (
      <Stack>
        <Stack direction="row" spacing={3}>
          {isNew ? (
            <>
              <Button onClick={savePost} variant="contained" color="primary">
                Enregister
              </Button>
              <Button
                onClick={cancelPost}
                variant="contained"
                color="secondary"
              >
                Annuler
              </Button>
            </>
          ) : (
            <>
              {!isUpdate ? (
                <Button
                  onClick={updateInterface}
                  variant="contained"
                  color="primary"
                >
                  Modifier
                </Button>
              ) : (
                <Button
                  onClick={cancelUpdate}
                  variant="contained"
                  color="secondary"
                >
                  Annuler
                </Button>
              )}

              {!isUpdate ? (
                <>
                  <Button
                    onClick={confirmDelete}
                    variant="contained"
                    color="secondary"
                  >
                    Supprimer
                  </Button>
                  <Button onClick={newPost} variant="contained" color="primary">
                    Nouveau
                  </Button>
                  <Button
                    onClick={duplicatePost}
                    variant="contained"
                    color="primary"
                  >
                    Dupliquer
                  </Button>
                </>
              ) : (
                <Button
                  onClick={overideDocById}
                  variant="contained"
                  color="primary"
                >
                  Modifier
                </Button>
              )}
            </>
          )}
        </Stack>

        {(isUpdate || isNew) && (
          <>
            <Stack direction="row">
              <Stack sx={theme.titles}>
                <Typography variant="span">
                  {" "}
                  <b>Langage</b>
                </Typography>
                <Typography variant="span">
                  <b>Catégorie</b>{" "}
                </Typography>
                <Typography variant="span">
                  <b>Titre</b>
                </Typography>
              </Stack>

              <Stack sx={theme.titles}>
                <label>
                  <input ref={langRef} type="text" defaultValue={lang} />
                </label>
                <label>
                  <input
                    ref={categoryRef}
                    type="text"
                    defaultValue={category}
                  />
                </label>
                <label>
                  <input
                    ref={titleRef}
                    type="text"
                    defaultValue={!isNew ? title : ""}
                  />
                </label>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    );
  }
);

export default CrudButton;
