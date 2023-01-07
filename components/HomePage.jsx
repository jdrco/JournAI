import React from "react";
import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import TestDisplay from "./TestDisplay";

const HomePage = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center mb-6 text-sm bg-sky-100 p-3 rounded-md">
          <div className="mb-1 text-blue-500">Hello, {user?.displayName}</div>

          <button
            onClick={() => auth.signOut()}
            className="hover:underline text-red-500"
          >
            Sign Out
          </button>
        </div>
        <TestDisplay />
      </div>
    </>
  );
};

export default HomePage;
