import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC5FYU6otVNVX7KBjN_0p2yF8AvAHOY0FU",
  authDomain: "english-word-log.firebaseapp.com",
  databaseURL: "https://english-word-log.firebaseio.com",
  projectId: "english-word-log",
  storageBucket: "english-word-log.appspot.com",
  messagingSenderId: "913767669176"
});

firebase.firestore().settings({ timestampsInSnapshots: true });
