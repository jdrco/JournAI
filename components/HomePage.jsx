import { auth, db } from '../firebase/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Input from './Input';
import { query, collection, onSnapshot } from 'firebase/firestore';

const HomePage = () => {
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);
  console.log(entries);

  //Here for testing purposes with barchart element rigidity
  let output = `[{"label": "sadness", "score": 0.4088817834854126}, {"label": "neutral", "score": 0.32471874356269836}, {"label": "surprise", "score": 0.13414035737514496}, {"label": "joy", "score": 0.03980706259608269}, {"label": "anger", "score": 0.034086793661117554}, {"label": "fear", "score": 0.03125927224755287}, {"label": "disgust", "score": 0.027105990797281265}]`;
  const data = JSON.parse(output);

  data.sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });

  // read from database
  useEffect(() => {
    const q = query(collection(db, 'entries')); // need to convert

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let entriesArr = [];
      querySnapshot.forEach((doc) => {
        entriesArr.push({ ...doc.data(), id: doc.id });
      });
      setEntries(entriesArr.filter((doc) => doc.uid === user.uid));
    });

    return () => unsubscribe();
  }, []);

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
        </div>
        <Input user={user} />
      </div>
    </>
  );
};

export default HomePage;
