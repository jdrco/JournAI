import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseApp';
import { BarChart } from '../../components/Barchart';
import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Entry = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState({});

  //   useEffect(() => {
  //     const q = query(collection(db, 'entries')); // need to convert

  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       let entriesArr = [];
  //       querySnapshot.forEach((doc) => {
  //         entriesArr.push({ ...doc.data(), id: doc.id });
  //       });
  //       setEntry(entriesArr.filter((doc) => doc.id === id));
  //     });

  //     return () => unsubscribe();
  //   }, []);

  const getSingle = async () => {
    const docRef = doc(db, 'entries', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setEntry(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getSingle();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-1/2 h-full text-black flex flex-col justify-center items-center">
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
      </div>
    </>
  );
};

export default Entry;
