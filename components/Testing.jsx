import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React,{useState,useEffect} from 'react';
import db from './firebase.config';

const Testing = () => {
  const [entries, setEntries]=useState([])

  return (
    <div>
      <p>Hello world</p>
    </div>
  )

export default Testing;