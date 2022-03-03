import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { auth, db, logout, getDataBydocId } from "../db/firebase";
import { initialState } from "../db/reducer";
import { useStateValue } from "../db/StateProvider";

function Home() {
  let navigate = useNavigate();
  const [dispatch] = useStateValue();
  const [user, setUser] = useState({ firstname: "waiting..." });

  /*const getDataBydocId = async (collect, value) => {
    const [{ user }, dispatch] = useStateValue();

    const docRef = doc(db, collect, value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser({ ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  };
*/
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        //  getDataBydocId("users", user.uid);
        // console.log(GetDataBydocId("users", user.uid));
        userInfo(user.uid);
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
      <h1>Hello my friend {user.firstname + " " + user.lastname} </h1>
    </>
  );
}

export default Home;
