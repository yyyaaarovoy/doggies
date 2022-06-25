import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyCBbDpZUJIt2h0p1LRK38enb8wrpZPkpQE",
  authDomain: "yarovoy-d.firebaseapp.com",
  databaseURL: "https://yarovoy-d-default-rtdb.firebaseio.com",
  projectId: "yarovoy-d",
  storageBucket: "yarovoy-d.appspot.com",
  messagingSenderId: "176286184164",
  appId: "1:176286184164:web:cea01b0d6a98b7741bf2f1",
  measurementId: "G-3FYX89CE49",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
