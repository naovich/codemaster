import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import {
  auth,
  db,
  getDataBydocId,
  getDataByField,
  logout,
} from "../db/firebase";
import { useStateValue } from "../db/StateProvider";

function Home() {
  let navigate = useNavigate();
  const [dispatch] = useStateValue();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => setUser(snapshot.data()));

        //getDataBydocId("users", user.uid);

        //  getDataByField("users", "uid", "==", user.uid);
        // userInfo(user.uid);
        /*
        onSnapshot(collection(db, "users"), (snapshot) =>
          //setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          console.log(snapshot.docs.map((doc) => doc.data()))
        );
        */
      } else {
        navigate("/login");
      }
    });
  }, []);

  function userInfo(userId) {
    dispatch({ type: "login", payload: userId });
  }

  return (
    <>
      <Menu />
      <h1>Hello </h1>
    </>
  );
}

export default Home;
