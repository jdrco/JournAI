import { auth, db } from "../.././firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React,{ useState, useEffect } from 'react';

const Testing = () => {
  const [user, loading, error] = useAuthState(auth);
  const [entries, setEntries]=useState([])

  const fetchEntries = async() => {
    const response = db.collection('entries');
    const data = await response.get();
    console.log(data);
  };

  useEffect(() => {
    fetchEntries();
  }, [])

  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

export default Testing;