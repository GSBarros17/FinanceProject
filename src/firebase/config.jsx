
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYNlMLSmrcrWhA2rOpyDO5d6z-FpkPZeA",
  authDomain: "finance-8a6b1.firebaseapp.com",
  projectId: "finance-8a6b1",
  storageBucket: "finance-8a6b1.appspot.com",
  messagingSenderId: "920951677603",
  appId: "1:920951677603:web:e72488a781e21b91ff1516",
  measurementId: "G-7RQFMWZKZ6"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
export { app }