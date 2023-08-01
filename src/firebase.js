// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArbEGtjm410Z0j2wPmlauHKEUdhM591BU",
  authDomain: "donor-track.firebaseapp.com",
  projectId: "donor-track",
  storageBucket: "donor-track.appspot.com",
  messagingSenderId: "424673263113",
  appId: "1:424673263113:web:2cb57b91cec60ed85042d8",
  measurementId: "G-KFN1ZERVQY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);


