import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Button, Divider, Stack, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { Box } from "@mui/system";
import ConfirmDialog from "../Components/ConfirmDialog";
import SnackMessage from "../Components/Snackmessage";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

function Code({ code }) {
  let formatCode = code.trim();
  formatCode.replace(";", "xxx");

  const [codes, setCodes] = useState(formatCode);
  const codeRef = useRef();
  const commentRef = useRef();

  function updateComment() {
    setCodes(codeRef.current.value);
  }

  return (
    <>
      <Typography align="left" color="white" variant="h5"></Typography>
      <Stack direction="row" sx={{ height: 920, width: 782 }}>
        <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      </Stack>
    </>
  );
}

export default Code;

export function UpdateCode({
  code,
  comment,
  lang,
  category,
  title,
  confirmDelete,
  idPost,
}) {
  const [codeOnChange, setCodeOnChange] = useState(code);
  const [isNew, setIsNew] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);

  const langRef = useRef(null);
  const codeRef = useRef(null);
  const commentRef = useRef(null);

  const titleRef = useRef(null);
  const categoryRef = useRef(null);

  function newPost() {
    setIsNew(true);
  }

  function cancelPost() {
    setIsNew(false);
  }

  function updateInterface() {
    setIsUpdate(true);
  }

  function updatPost() {}

  function onChangeCode() {
    setCodeOnChange(codeRef.current.value);
  }

  function cancelupdate() {
    setIsUpdate(false);
  }

  function confirmDelete() {
    setDialogOpened(true);
  }

  function cancelDelete() {
    setDialogOpened(false);
  }

  //---------------- Suppression -------------------

  const deleteDocById = async () => {
    const docRef = doc(db, "codes", idPost);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.log("Erreur");
    } finally {
      cancelDelete();
      console.log("Suppprimé");
    }
  };

  //---------------- Modification -------------------
  const overideDocById = async () => {
    if (
      langRef.current.value != "" &&
      categoryRef.current.value != "" &&
      titleRef.current.value != "" &&
      codeRef.current.value != ""
    ) {
      const payload = {
        lang: langRef.current.value,
        title: titleRef.current.value.toLowerCase(),
        code: codeRef.current.value,
        category: categoryRef.current.value,
        comment: commentRef.current.value,
        timestamp: serverTimestamp(),
      };
      const docRef = doc(db, "codes", idPost);
      await setDoc(docRef, payload);
      // gotoPost(idPost);

      cancelupdate();
    }
  };

  //---------------- Insertion -------------------
  const savePost = async () => {
    if (
      langRef.current.value != "" &&
      categoryRef.current.value != "" &&
      titleRef.current.value != "" &&
      codeRef.current.value != ""
    ) {
      const payload = {
        lang: langRef.current.value.toLowerCase(),
        title: titleRef.current.value.toLowerCase(),
        code: codeRef.current.value,
        category: categoryRef.current.value.toLowerCase(),
        comment: commentRef.current.value,
        timestamp: serverTimestamp(),
      };

      const collectionRef = collection(db, "codes");
      const docref = await addDoc(collectionRef, payload);
      codeRef.current.value = "";
      cancelPost();

      return docref;
      //console.log(docref.id);
    } else {
      console.log("Remplir les champs");
    }
  };

  return (
    <>
      <ConfirmDialog
        message=" Voulez-vous suppression l'enregistrement ?"
        title="SUPPRIMER"
        opened={dialogOpened}
        handleClose={cancelDelete}
        deletePost={deleteDocById}
      />
      <SnackMessage
        opened={true}
        message="Enregistré avec succés"
        time={4000}
      />
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
                  onClick={cancelupdate}
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

        {isUpdate || isNew ? (
          <>
            <Stack direction="row">
              <Stack sx={theme2.titles}>
                <Typography variant="span">Langage :{lang}</Typography>
                <Typography variant="span">Cathégorie : {category} </Typography>
                <Typography variant="span">Titre : {title} </Typography>
              </Stack>

              <Stack sx={theme2.titles}>
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

            <textarea
              style={{ margin: 5, width: "500px" }}
              rows={30}
              cols={3}
              ref={codeRef}
              defaultValue={!isNew ? code : ""}
              onChange={onChangeCode}
            />
            <textarea
              style={{ margin: 5, width: "500px" }}
              rows={5}
              cols={3}
              ref={commentRef}
              defaultValue={!isNew ? comment : ""}
            />
          </>
        ) : (
          <Box sx={theme2.boxComment}>
            <Typography variant="p">{comment}</Typography>
          </Box>
        )}
      </Stack>
    </>
  );
}

const theme2 = {
  titles: {
    marginRight: 5,
    marginTop: 3,
  },
  boxComment: {
    marginTop: 3,
  },
};
