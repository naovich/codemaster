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
        //setUser(GetDataBydocId("users", user.uid));

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().firstname);

          return docSnap.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
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
      <h1>Hello my friend {user.firstname} </h1>
    </>
  );
}

export default Home;
