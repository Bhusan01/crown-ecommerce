import React from "react";
import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const signUserWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    await createUserDocument(user);
  };
  return (
    <div>
      SignIn
      <button onClick={signUserWithGoogle}>sign in with Google</button>
    </div>
  );
};

export default SignIn;
