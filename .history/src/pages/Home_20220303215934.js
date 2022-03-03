import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import {
  auth,
  db,
  GetDataBydocId,
  getDataByField,
  logout,
} from "../db/firebase";
import { initialState } from "../db/reducer";
import { useStateValue } from "../db/StateProvider";

function Home() {
  let navigate = useNavigate();
  const [dispatch] = useStateValue();
  const [user, setUser] = useState({ firstname: "waiting..." });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        //getDataBydocId("users", user.uid);
        // console.log(GetDataBydocId("users", user.uid));

        /*const collectionRef = collection(db, "users");
       const q = query(collectionRef, orderBy("timestamp", "desc"));
       const unsub = onSnapshot(q, (snapshot) =>
         setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
      <h1>
        Hello my friend{" "}
        {initialState.user.firstname + " " + initialState.user.lastname}{" "}
      </h1>
    </>
  );
}

export default Home;
