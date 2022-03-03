import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(uid);
    } else {
      navigate("/login");
    }
  });

  return <div>Home </div>;
}

export default Home;
