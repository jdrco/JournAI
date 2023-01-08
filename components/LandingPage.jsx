import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { GiUnicorn } from 'react-icons/gi';
import { auth } from '../firebase/firebaseApp';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import Link from 'next/link';

const LandingPage = () => {
  const provider = new GoogleAuthProvider();

  const redirectToSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center backdrop-opacity-100 bg-gradient-to-r from-slate-300 to-slate-50">
      <div className="flex justify-between items-center h-[8%] w-screen bg-transparent p-10 sm:p-12">
        <div>
          <GiUnicorn size={'2em'} />
        </div>
        <Link href="https://devpost.com/software/journai-8wl03y">
          <button>
            <BsFillQuestionCircleFill size={'2em'} />
          </button>
        </Link>
      </div>

      <div className="bg-transparent w-screen h-[92%] flex flex-col lg:flex-row">
        <div className="bg-inherit h-[50%] flex flex-col justify-center items-center lg:items-baseline lg:ml-40 px-8 lg:h-[100%] lg:w-1/2">
          <div className="font-PlayfairDisplay bg-transparent mb-4 font-bold text-6xl lg:w-80 text-center lg:text-left">
            It's time for reflection.
          </div>
          <div className="font-SourceSansPro mb-4 text-2xl lg:w-80">
            Data about your health, not your wealth.
          </div>
          <button
            className="bg-[#5e5d5c] hover:bg-black w-[220px] h-[80px] rounded-md text-2xl text-white"
            onClick={redirectToSignIn}
          >
            Sign In
          </button>
        </div>

        <div className="bg-transparent text-center flex flex-col gap-4 items-center h-[50%] lg:h-[100%] lg:w-1/2">
          <img src="/writing.png" alt="Writing" width="200px"></img>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
