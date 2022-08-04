import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGVeK0xdhJDGSTz666cVA-Pw2uWTodbcE",
  authDomain: "crown-ecommerce-a5d47.firebaseapp.com",
  projectId: "crown-ecommerce-a5d47",
  storageBucket: "crown-ecommerce-a5d47.appspot.com",
  messagingSenderId: "345444170252",
  appId: "1:345444170252:web:836078a1866d9b2065cc29",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  return res;
};

export const db = getFirestore();

export const createUserDocument = async (user, formfields) => {
  if (!user) return;
  const userDocRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    let { displayName, email } = user;
    if (!displayName) {
      displayName = formfields;
    }
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const createUserwithPasswordandEmail = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
