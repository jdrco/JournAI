import { auth, db } from '../firebase/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import Donut from './Donut';
import Input from './Input';
import { query, collection, onSnapshot } from 'firebase/firestore';

const HomePage = () => {
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);
  console.log(entries);

  const queryRange = (range) => {
    const curr_date = new Date();
    const last_date = new Date(curr_date.getTime() - range * 86400000);

    const q = query(collection(db, 'entries')); // need to convert

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let entriesArr = [];
      querySnapshot.forEach((doc) => {
        entriesArr.push({ ...doc.data(), id: doc.id });
      });
      setEntries(entriesArr.filter((doc) => (doc.uid === user.uid && doc.date >= last_date && doc.date <= curr_date)));
    });

    return () => unsubscribe();
  }

  function onClick(range) {
    queryRange(range);
  }

  // read from database
  useEffect(() => {
    queryRange(1); // always want 1 day data showing on fresh render
  }, []);

  // calculation for entries
  let emotionCalc = {
    sadness: 0,
    neutral: 0,
    surprise: 0,
    joy: 0,
    anger: 0,
    fear: 0,
    disgust: 0,
  };

  entries.forEach((entry) => {
    entry.emotions.forEach((emotion) => {
      emotionCalc[emotion.label] += emotion.score;
    });
  });

  for (const key in emotionCalc) {
    emotionCalc[key] /= entries.length;
  }

  console.log(emotionCalc);
  let labelsArr = Object.keys(emotionCalc);
  let scoreArr = Object.values(emotionCalc);

  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: 'ferta',
        //   data: [12, 19, 3, 5, 2, 3],
        data: scoreArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
        <div className="flex">
          <button onClick={() => onClick(1)}>1 Day</button>
          <button onClick={() => onClick(7)}>1 Week</button>
          <button onClick={() => onClick(30)}>1 Month</button>
          <button onClick={() => onClick(90)}>3 Months</button>
          <button onClick={() => onClick(180)}>6 Months</button>
        </div>
        <div>
          <Donut data={data} />
        </div>
        <Input user={user} />
      </div>
    </>
  );
};

export default HomePage;
