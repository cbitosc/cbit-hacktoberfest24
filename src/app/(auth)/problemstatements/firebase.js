import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 	apiKey: "AIzaSyAG22__K6wSM8nCkxRwjfO5cHo7ZgzBo8U",
 	authDomain: "cosc-hacktoberfest-24.firebaseapp.com",
 	projectId: "cosc-hacktoberfest-24",
 	storageBucket: "cosc-hacktoberfest-24.appspot.com",
 	messagingSenderId: "26120440134",
 	appId: "1:26120440134:web:c69bf4d8de3de07961bd47",
 	measurementId: "G-4XWRXD8DTJ"
   };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };