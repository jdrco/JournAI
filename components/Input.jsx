import React, { useState } from 'react';

const Input = () => {
  const [input, setInput] = useState('');

  // create entry
  const createEntry = async (e) => {
    e.preventDefault(e);

    /* database stuff with firbase */

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
      .then((data) => {
        console.log(data.data[0]);
      });
  };

  return (
    <div className="mt-8 w-full flex items-center justify-center">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={createEntry}
      >
        <input
          className="border p-2 w-full text-xl"
          type="text"
          placeholder="Add Journal Entry"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="text-center bg-blue-600 text-white rounded-md p-2 w-48">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default Input;
