import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../db/firebase";

function Start() {
  let navigate = useNavigate();
  logout();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return <div>Start</div>;
}

export default Start;
