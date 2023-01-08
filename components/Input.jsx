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
        setInput('');
        console.log(data.data[0]);
        let date = new Date();
        let entry = {
          uid: user.uid,
          date: `${
            date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
          }`,
          entry: input,
          emotions: JSON.parse(`${data.data[0].replace(/'/g, '"')}`),
        };
        await addDoc(collection(db, 'entries'), entry);
      });

    // dbRef = collection(db, "entries");
    // await addDoc(dbRef, data)
  };

  return (
    <div className="mt-8 w-full flex items-center justify-center">
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={createEntry}
      >
        <label
          for="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your message
        </label>
        <textarea
          readonly
          id="message"
          rows="4"
          className="block p-2.5 w-3/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          value={input}
          placeholder="Write your thoughts here..."
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button className="text-center bg-blue-600 text-white rounded-md p-2 w-3/4">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default Input;
