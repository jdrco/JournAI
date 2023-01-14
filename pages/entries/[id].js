import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseApp';
import EntryChart from '../../components/EntryChart';
import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Entry = () => {
  const router = useRouter();
  const { id } = router.query;

  const [entry, setEntry] = useState({});
  const [labelsArr, setLabelsArr] = useState([]);
  const [scoreArr, setScoreArr] = useState([]);

  const getSingle = async () => {
    const docRef = doc(db, 'entries', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEntry(docSnap.data());
      setLabelsArr(docSnap.data().emotions.map((cat) => cat.label));
      setScoreArr(
        docSnap
          .data()
          .emotions.map((cat) => cat.score)
          .map((score) => (score * 100).toFixed(2))
      );
    } else {
      console.log('No such document!');
    }
  };

  console.log(entry.emotions);
  console.log(labelsArr);
  console.log(scoreArr);

  useEffect(() => {
    if (!id) return;

    getSingle();
  }, [id]);

  const config = {
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    options: {
      labels: labelsArr,
      colors: [
        '#C9C2CB',
        '#93859D',
        '#622E8B',
        '#260B3B',
        '#F16444',
        '#264B3B',
        '#290B3B',
      ],
      stroke: {
        lineCap: 'round',
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: false,
          startAngle: 0,
          endAngle: 270,
          offsetX: 0,
          offsetY: 0,
          hollow: {
            margin: 5,
            size: '60%',
            background: 'transparent',
            image: undefined,
            imageWidth: 0,
            imageHeight: 0,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#f2f2f2',
            strokeWidth: '50%',
            opacity: 1,
            margin: 6,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: undefined,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: undefined,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val + ' %';
              },
            },
          },
        },
      },
    },

    series: scoreArr,
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-2/3 h-full flex justify-center items-center">
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

          <div className="w-1/2 h-full flex justify-center items-center">
            <EntryChart config={config} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Entry;
