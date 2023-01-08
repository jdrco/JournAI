import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import TestDisplay from "./TestDisplay";
import React, { useState } from "react";
import LoadingPage from "./LoadingPage";
import BarChart from "./BarChart";
import { sort } from "d3";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);


  //Here for testing purposes with barchart element rigidity
  let output = `[{"label": "sadness", "score": 0.4088817834854126}, {"label": "neutral", "score": 0.32471874356269836}, {"label": "surprise", "score": 0.13414035737514496}, {"label": "joy", "score": 0.03980706259608269}, {"label": "anger", "score": 0.034086793661117554}, {"label": "fear", "score": 0.03125927224755287}, {"label": "disgust", "score": 0.027105990797281265}]`;
  const data = JSON.parse(output);

  data.sort(function(a, b){
    return a.label.localeCompare(b.label)
  })

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
          <BarChart data/>
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
