//------------------------- IMPORT -------------------------------
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  updateDoc,
  query,
  doc,
  deleteDoc,
  getDocs,
  where,
  serverTimestamp,
  orderBy,
  getDoc,
} from "firebase/firestore";

import { initialState } from "./reducer";

//------------------------- CONFIG -------------------------------

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

//------------------------- INIT -------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const user = {};

//------------------------- AUTHENTIFICATION -------------------------------

//----------- LOGIN --------------

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    console.log(auth.currentUser.email);
    console.log(auth.currentUser.uid);
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(
        doc(db, "users", user.uid.toString()),
        {
          name: user.displayName,
          authProvider: "facebook",
          email: user.email,
          imgProfil: user.photoURL,
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error(err);
  }
};

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(
        doc(db, "users", user.uid.toString()),
        {
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          imgProfil: user.photoURL,
          timestamp: serverTimestamp(),
        },
        { merge: true }
      ).then(() => console.log("connecté"));
    }
  } catch (err) {
    console.error(err);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
  }
});

//----------- REGISTER --------------

const registerWithEmailAndPassword = async (
  firstname,
  lastname,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid.toString()), {
      firstname,
      lastname,
      authProvider: "local",
      email,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error(err);
  }
};

//----------- RESET PASSWORD --------------

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

//------------------------- QUERY -------------------------------
//------- GET -----------

export const getDataBydocId = async (collect, value) => {
  const docRef = doc(db, collect, value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().firstname);
    initialState.user = docSnap.data();
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getDataByField = async (collect, field, operator, value) => {
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  const results = snapshot.docs;
  console.log(results);
  return results;
};

export const getDataByOrder = async (collect, field, order = "desc") => {
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, orderBy(field, order));
  const snapshot = await getDocs(q);
  const results = snapshot.docs;
  return results;
};

//-------- UPDATE -------

export const updateDocById = async (collect, id, payload) => {
  const docRef = doc(db, collect, id);
  payload = { ...payload, timestamp: serverTimestamp() };
  updateDoc(docRef, payload);
};

export const overideDocById = async (collect, id, payload) => {
  const docRef = doc(db, collect, id);
  payload = { ...payload, timestamp: serverTimestamp() };
  setDoc(docRef, payload);
};

//-------- DELETE -------

export const deleteDocById = async (collect, id) => {
  const docRef = doc(db, collect, id);
  await deleteDoc(docRef);
};

export const deleteDocByField = async (collect, field, operator, value) => {
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  results.forEach(async (result) => {
    const docRef = doc(db, collect, result.id);
    await deleteDoc(docRef);
  });
};

//----------- EXPORT --------------

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
};
