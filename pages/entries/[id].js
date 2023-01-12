import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseApp';
import { BarChart } from '../../components/Barchart';
import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';



const Entry = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [entry, setEntry] = useState({});

  const getSingle = async () => {
    const docRef = doc(db, 'entries', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setEntry(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    if (!id)
      return
    
    getSingle();
  }, [id]);

  const data = {
    // labels: labelsArr,
    datasets: [
      {
        label: 'Emotion',
        //   data: [12, 19, 3, 5, 2, 3],
        // data: scoreArr,
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
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-1/2 h-full text-black flex flex-col justify-center items-center px-20">
          <div className="text-4xl font-bold w-full font-SourceSansPro mb-2">
            Journal Entry
          </div>
          <div className="w-full mb-2 font-light">{entry.date}</div>
          <div className="w-full">{entry.entry}</div>
          <Link href="/" className="w-full mt-2">
            <div className="w-full underline text-black text-left">
              go back to home
            </div>
          </Link>
        </div>

        <div className="w-1/2 h-full bg-red-100 flex justify-center items-center">
          {/* <BarChart data={data} options={options} /> */}
        </div>
      </div>
    </>
  );
};

export default Entry;
