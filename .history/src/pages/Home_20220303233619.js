import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { auth, db, logout } from "../db/firebase";
import { initialState } from "../db/reducer";
import { useStateValue } from "../db/StateProvider";

function Home() {
  /* function userInfo(userId) {
    dispatch({ type: "login", payload: userId });
  }
  */

  return (
    <>
      <Menu />
      <h1></h1>
    </>
  );
}

export default Home;
