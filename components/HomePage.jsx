import { auth, db } from '../firebase/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import Donut from './Donut';
import Input from './Input';
import { query, collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

const HomePage = () => {
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);

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
        label: 'Emotion',
        //   data: [12, 19, 3, 5, 2, 3],
        data: scoreArr,
        hoverOffset: 10,
        backgroundColor: [
          'rgba(53, 55, 27)',
          'rgba(132, 172, 206)',
          'rgba(130, 113, 145)',
          'rgba(125, 29, 63)',
          'rgba(226, 161, 141)',
          'rgba(255, 132, 31)',
          'rgba(61, 28, 0)',
        ],
        borderColor: [
          'rgba(53, 55, 27)',
          'rgba(132, 172, 206)',
          'rgba(130, 113, 145)',
          'rgba(125, 29, 63)',
          'rgba(226, 161, 141)',
          'rgba(255, 132, 31)',
          'rgba(61, 28, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      responive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right',
        labels: {
          padding: 10,
        },
      },
    },
  };

  const optionsBar = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center">
        <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
          <div class="mb-2 sm:mb-0">
            <div class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
              Hello, {user.displayName}
            </div>
          </div>
          <div>
            <button
              onClick={() => auth.signOut()}
              className="hover:underline text-slate-500"
            >
              Sign Out
            </button>
          </div>
        </nav>

        <div className="w-full h-full flex flex-row">
          <div className=" w-1/2 h-full flex justify-center items-center">
            <Donut data={data} options={options} />
          </div>

          <div className=" h-full w-1/2 flex flex-col">
            <div className="w-full h-1/2 flex justify-center items-end">
              <div className="w-3/4 rounded-xl h-56 border border-1 border-gray-200 overflow-auto">
                {entries.map((entry) => (
                  <Link href={`/entries/${entry.id}`}>
                    <div
                      key={entry.id}
                      className="h-12 m-[6px] rounded-md border border-1 border-gray-300 text-black text-xs flex items-center"
                    >
                      <div className="pl-4 truncate w-1/2 font-bold">
                        {entry.entry}
                      </div>
                      <div className="truncate w-1/2 text-right pr-4 font-light">
                        {entry.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Input user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
