import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { auth, logout } from "../db/firebase";
import { useStateValue } from "../db/StateProvider";

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
      <h1>Hello {auth.currentUser.email}</h1>
    </>
  );
}

export default Home;
