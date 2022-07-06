import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt_k1C528lzfFzZ52oCPaSGVnJQ2kfYK4",
  authDomain: "collectionz-db.firebaseapp.com",
  projectId: "collectionz-db",
  storageBucket: "collectionz-db.appspot.com",
  messagingSenderId: "75122630494",
  appId: "1:75122630494:web:60823f4c3a054774e3b9cf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.map((doc) => doc.data());

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  otherInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...otherInformation,
      });
    } catch (error) {
      console.log("error creating a user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUserAuth = async () => await signOut(auth);

export const onAuthStateChangeHandler = (callback) => {
  onAuthStateChanged(auth, callback);
};
