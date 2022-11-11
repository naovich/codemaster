import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import LeftMenu from "./LeftMenu";
import FilterMenu from "./FilterMenu";
import React, { useEffect, useRef, useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { db } from "../db/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import ConfirmDialog from "./ConfirmDialog";
import { vsCodeTheme } from "./codeTheme";
import Header from "./Header";
import CrudButton from "./CrudButton";

const codePostInit = {
  id: 0,
  title: "Mon titre",
  comment: "comment",
  lang: "javascript",
  category: "Tableau",
  code: `Code Master by Ndhoir ATTOUMANI`,
};

function Main() {
  //------------- Initialisation ---------------

  const [lang, setLang] = useState("note");
  const [codeTitle, setCodeTitle] = useState([]);
  const [codePost, setCodePost] = useState(codePostInit);

  const [isNew, setIsNew] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [snackOpened, setSnackOpened] = useState(false);

  const langRef = useRef(null);
  const titleRef = useRef(null);
  const categoryRef = useRef(null);

  //------ Chargement des données de départ  ---------

  useEffect(() => {
    const collectionRef = collection(db, "codes");
    const q = query(
      collectionRef,
      where("lang", "==", lang),
      orderBy("category", "asc"),
      orderBy("title", "asc")
    );
    onSnapshot(q, (snapshot) =>
      setCodeTitle(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, [lang]);
  const gotoPost = async (value) => {
    const docRef = doc(db, "codes", value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCodePost({ ...docSnap.data(), id: docSnap.id });
      cancelUpdate();
    }
  };
  //-------------------   Change langue -------------------
  function onChangeLang(langId) {
    setLang(langId);
    cancelUpdate();
  }

  //--------------------------------Update Code -------------------

  function newPost() {
    setIsNew(true);
    setCodePost({ ...codePost, code: "", title: "" });
    setSnackOpened(true);
  }

  function duplicatePost() {
    setIsNew(true);
    setCodePost({ ...codePost, title: "" });
    setSnackOpened(true);
  }

  function cancelPost() {
    setIsNew(false);
  }

  function updateInterface() {
    setIsUpdate(true);
  }

  function cancelUpdate() {
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
    const docRef = doc(db, "codes", codePost.id);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.log("Erreur");
    } finally {
      cancelDelete();
      setCodePost(codePostInit);
      console.log("Suppprimé");
    }
  };

  //---------------- Modification -------------------
  const overideDocById = async () => {
    if (
      langRef.current.value !== "" &&
      categoryRef.current.value !== "" &&
      titleRef.current.value !== ""
    ) {
      const payload = {
        lang: langRef.current.value,
        title: titleRef.current.value.toLowerCase(),
        code: codePost.code,
        category: categoryRef.current.value,
        timestamp: serverTimestamp(),
      };
      const docRef = doc(db, "codes", codePost.id);
      await setDoc(docRef, payload);

      cancelUpdate();
    }
  };

  //---------------- Insertion -------------------
  const savePost = async () => {
    if (
      langRef.current.value !== "" &&
      categoryRef.current.value !== "" &&
      titleRef.current.value !== ""
    ) {
      const payload = {
        lang: langRef.current.value.toLowerCase(),
        title: titleRef.current.value.toLowerCase(),
        code: codePost.code,
        category: categoryRef.current.value.toLowerCase(),
        timestamp: serverTimestamp(),
      };

      const collectionRef = collection(db, "codes");
      const docref = await addDoc(collectionRef, payload);
      cancelPost();
      gotoPost(docref.id);
    } else {
      console.log("Remplir les champs");
    }
  };
  //--------------------- RENDER --------------------

  return (
    <>
      <Grid container spacing={2}>
        <LeftMenu lang={lang} onChangeLang={onChangeLang} />
        <Grid className="scol" item xs={8} sm={2} lg={2} sx={theme.firstCol}>
          <FilterMenu codeTitle={codeTitle} gotoPost={gotoPost} />
        </Grid>
        <Grid item xs={12} sm={8} lg={8}>
          <Box sx={theme.mainCol}>
            <Header codePost={codePost} theme={theme} />

            <Stack sx={theme.codeBox} spacing={3}>
              <ConfirmDialog
                message=" Voulez-vous suppression l'enregistrement ?"
                title="SUPPRIMER"
                opened={dialogOpened}
                handleClose={cancelDelete}
                deletePost={deleteDocById}
              />
              <CrudButton
                isNew={isNew}
                savePost={savePost}
                cancelPost={cancelPost}
                isUpdate={isUpdate}
                updateInterface={updateInterface}
                cancelUpdate={cancelUpdate}
                confirmDelete={confirmDelete}
                newPost={newPost}
                duplicatePost={duplicatePost}
                overideDocById={overideDocById}
                theme={theme}
                lang={lang}
                category={codePost.category}
                title={codePost.title}
                ref={{ langRef, titleRef, categoryRef }}
              />
              <CodeMirror
                value={codePost.code}
                height="700px"
                extensions={[javascript({ jsx: true })]}
                theme={vsCodeTheme}
                onChange={(value) => setCodePost({ ...codePost, code: value })}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Main;

const theme = {
  firstCol: {
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
    height: "85vh",
    overflow: "scroll",
  },
  mainCol: {
    border: "solid 1px lightgrey",
    padding: 1,
    height: "85vh",
    overflow: "scroll",
  },
  titles: {
    marginRight: 5,
  },
  codeBox: {
    border: "solid 1px lightgrey",
    padding: 1,
    marginTop: 2,
    backgroundColor: "#EAF8F2",
    maxWidth: "100%",
  },

  lastCol: {
    border: "solid 1px lightgrey",
    borderLeft: "0px",
    padding: 1,
    marginTop: 2,
    height: "85vh",
    overflow: "scroll",
  },
  search: {},
};
