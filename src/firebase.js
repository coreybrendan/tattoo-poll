import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBSeQ2MpfgJjuInPN2cCRSLQGXzdJaBbHE",
  authDomain: "tattoo-poll.firebaseapp.com",
  projectId: "tattoo-poll",
  storageBucket: "tattoo-poll.appspot.com",
  messagingSenderId: "669150141030",
  appId: "1:669150141030:web:7f4dd16762578f5716eba7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;