import { auth, db } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import Input from "./Input";
import { query, collection, onSnapshot } from "firebase/firestore";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  // create entry
  const createEntry = async (e) => {
    e.preventDefault(e);

    /* database stuff with firbase */

    /* make API call to ml-server */
    fetch("http://127.0.0.1:7860/run/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [input],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0]);
      });
  };

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
        <div className="mt-8 w-full flex items-center justify-center">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={createEntry}
          >
            <input
              className="border p-2 w-full text-xl"
              type="text"
              placeholder="Add Journal Entry"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="text-center bg-blue-600 text-white rounded-md p-2 w-48">
              Add Entry
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
