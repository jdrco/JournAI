import React from "react";
import { auth } from "../firebase/firebaseApp";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const LandingPage = () => {
  const provider = new GoogleAuthProvider();

  const redirectToSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center backdrop-opacity-100 bg-gradient-to-r from-slate-300 to-slate-50">
      <div className="flex justify-between items-center h-[8%] w-screen bg-transparent p-10 sm:p-12">
        <div>LOGO</div>
        <button className="rounded-full bg-[#5e5d5c] p-6"></button>
      </div>

      <div className="bg-transparent w-screen h-[92%] flex flex-col lg:flex-row">
        <div className="bg-inherit h-[40%] flex flex-col justify-center items-center px-8 lg:h-[100%] lg:w-1/2">
          <div className="bg-transparent mb-4 text-center font-bold text-6xl">
            Our Mission Statement
          </div>
          <div className="mb-4 text-2xl">Lorem Ipsum Dolorum Est</div>
          <button
            className="bg-[#5e5d5c] w-[220px] h-[80px] rounded-md text-2xl text-white"
            onClick={redirectToSignIn}
          >
            Sign In
          </button>
        </div>

        <div className="bg-transparent text-center flex flex-col gap-4 items-center h-[60%] lg:h-[100%] lg:w-1/2"></div>
      </div>
    </div>
  );
};

export default LandingPage;
