import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../db/firebase";

function Start() {
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    });
  }, []);
}

export default Start;
