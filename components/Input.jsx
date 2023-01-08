import React, { useState } from 'react';
import { db } from '../firebase/firebaseApp';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

const Input = ({ user }) => {
  const [input, setInput] = useState('');
  // create entry
  const createEntry = async (e) => {
    e.preventDefault(e);

    /* database stuff with firbase */
    if (input === '') {
      alert('Please add a valid entry.');
      return; // check this
    }

    /* make API call to ml-server */
    fetch('http://127.0.0.1:7860/run/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [input],
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const date = new Date();
        setInput('');
        let entry = {
          uid: user.uid,
          date: date.toLocaleString('en-CA'),
          entry: input,
          emotions: JSON.parse(`${data.data[0].replace(/'/g, '"')}`),
        };
        await addDoc(collection(db, 'entries'), entry);
      });

    // dbRef = collection(db, "entries");
    // await addDoc(dbRef, data)
  };

  return (
    <div className="mt-8 w-full flex items-center justify-center ">
      <form
        className="flex flex-col justify-center items-center w-full my-5"
        onSubmit={createEntry}
      >
        <textarea
          id="message"
          rows="8"
          className="block resize-none p-2.5 w-3/4 text-sm text-gray-900 bg-white rounded-xl border h-32"
          value={input}
          placeholder="Write your thoughts here..."
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button className="text-center bg-black text-white rounded-xl p-2 w-3/4 m-[6px]">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default Input;
