import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf6HH0WzC4_ye61KhtSak5mQ2ZyZ6bLS8",
  authDomain: "trackr-b0c58.firebaseapp.com",
  projectId: "trackr-b0c58",
  storageBucket: "trackr-b0c58.appspot.com",
  messagingSenderId: "64056217067",
  appId: "1:64056217067:web:9e3e97faed9b08a837ddae"
};

let app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


export const firestore = app.firestore();
export const fire = firebase.firestore;

export const auth = app.auth();

export default app;
