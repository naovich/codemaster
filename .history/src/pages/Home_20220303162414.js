import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../db/firebase";

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return <h1>Home </h1>;
}

export default Home;
