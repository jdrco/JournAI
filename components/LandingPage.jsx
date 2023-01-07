import React from "react";
import { auth } from "../firebase/firebaseApp";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const LandingPage = () => {
  const provider = new GoogleAuthProvider();

  const redirectToSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-xl text-center font-bold mb-5">Landing Page</div>

      <div className="text-center flex flex-col gap-4 items-center">
        <div>Please sign in to continue</div>

        <button onClick={redirectToSignIn}>
          <div className="bg-blue-600 text-white rounded-md p-2 w-48">
            Sign In
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
