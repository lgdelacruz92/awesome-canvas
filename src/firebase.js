import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD58dsdKnWShQkW5Wuq7k8g91ar7q0r0e8",
  authDomain: "dns-container-with-updates.firebaseapp.com",
  databaseURL: "https://dns-container-with-updates.firebaseio.com",
  projectId: "dns-container-with-updates",
  storageBucket: "dns-container-with-updates.appspot.com",
  messagingSenderId: "291990727909",
  appId: "1:291990727909:web:5b13a630aa96bf6891b80c",
  measurementId: "G-ZY38HBH6XR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
