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
  onSnapshot,
  setDoc,
  updateDoc,
  query,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

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

//------------------------- AUTHENTIFICATION -------------------------------

//----------- LOGIN --------------

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    console.log(auth.currentUser.email);
    console.log(auth.currentUser.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
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
    // alert(err.message);
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
    // alert(err.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);
    console.log(user.photoURL);
    console.log(user.phoneNumber);
    console.log(user.displayName);
    console.log(user.emailVerified);

    // ...
  } else {
    // User is signed out
    // ...
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
    // alert(err.message);
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
//date: Timestamp.fromDate(new Date("December 10, 1815")),
//------- GET -----------

export const getDataByField = async (collect, field, operator, value) => {
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  const results = snapshot.docs;

  return results;
};

export const getDataByOrder = async (collect, field, order = "desc") => {
  const collectionRef = collection(db, collect);
  const q = query(collectionRef, orderBy(field, order));
  const snapshot = await getDocs(q);
  const results = snapshot.docs;
  return results;
};

/* 
  useEffect(
    () =>
      onSnapshot(
        collection(db, "user"),
        (snapshot) =>
          setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //console.log(snapshot.docs.map((doc) => doc.data()))
      ),

    []
  );
*/

/*
useEffect(() => {
  const collectionRef = collection(db, "user");
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  const unsub = onSnapshot(q, (snapshot) =>
    setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  );
}, []);

*/
//-------- INSERT -------

export const insertDoc = async (collec, payload) => {
  payload = { ...payload, timestamp: serverTimestamp() };
  const collectionRef = collection(db, collec);
  const docref = await addDoc(collectionRef, payload);
  return docref;
  console.log(docref.id);
};

/*
Dans certains cas, il peut être utile de créer une référence 
de document avec un ID généré automatiquement, 
puis d'utiliser la référence ultérieurement. 
Pour ce cas d'utilisation, vous pouvez appeler doc()
import { collection, doc, setDoc } from "firebase/firestore"; 
// Add a new document with a generated id
const newCityRef = doc(collection(db, "cities"));
// later...
await setDoc(newCityRef, data);

//--------------------------

import { doc, setDoc, updateDoc } from "firebase/firestore"; 
// Create an initial document to update.
const frankDocRef = doc(db, "users", "frank");
await setDoc(frankDocRef, {
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});

// To update age and favorite color:
await updateDoc(frankDocRef, {
    "age": 13,
    "favorites.color": "Red"
});

//------------------- Mettre à jour un tableau

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});

//------------------- Incrémenter

import { doc, updateDoc, increment } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    population: increment(50)
});

//------------------- DELETE FIELD

import { doc, updateDoc, deleteField } from "firebase/firestore";

const cityRef = doc(db, 'cities', 'BJ');

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
    capital: deleteField()
});



//------------- GET LIMITE
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name"), limit(3));
const q = query(citiesRef, orderBy("name", "desc"), limit(3))
const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
const q = query(citiesRef, orderBy("population"), startAt(1000000)); startAfter(A)
const q = query(citiesRef, orderBy("population"), endAt(1000000));  endBefore()
const next = query(collection(db, "cities"),orderBy("population"),startAfter(lastVisible),limit(25));
const q1 = query(collection(db, "cities"),
   orderBy("name"),
   orderBy("state"),
   startAt("Springfield"));

// Will return "Springfield, Missouri" and "Springfield, Wisconsin"
const q2 = query(collection(db, "cities"),
   orderBy("name"),
   orderBy("state"),
   startAt("Springfield", "Missouri"));


// ----------- Acitver la persistance de données

import { enableIndexedDbPersistence } from "firebase/firestore"; 

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully


*/
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
