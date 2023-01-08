import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import Input from "./Input";

const HomePage = () => {
  const [user] = useAuthState(auth);

  //Here for testing purposes with barchart element rigidity
  let output = `[{"label": "sadness", "score": 0.4088817834854126}, {"label": "neutral", "score": 0.32471874356269836}, {"label": "surprise", "score": 0.13414035737514496}, {"label": "joy", "score": 0.03980706259608269}, {"label": "anger", "score": 0.034086793661117554}, {"label": "fear", "score": 0.03125927224755287}, {"label": "disgust", "score": 0.027105990797281265}]`;
  const data = JSON.parse(output);

  data.sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });

  const data2 = [
    { value: 0.40888, },
    { value: 0.3247 },
    { value: 0.13414 },
    { value: 0.039807 },
    { value: 0.034087 },
    { value: 0.031259},
    { value: 0.027106}
  ];

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
        <div>
          <BarChart data={data} />
          <DonutChart data={data2} />
        </div>
        <Input />
      </div>
    </>
  );
};

export default HomePage;
