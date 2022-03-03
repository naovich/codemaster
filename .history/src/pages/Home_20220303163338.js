import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
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

  return (
    <>
      <Menu />
    </>
  );
}

export default Home;
