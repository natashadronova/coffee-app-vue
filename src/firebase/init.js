import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBmpiouWo-ASr2Ie5cvIvc7tk55IsJz86k",
  authDomain: "coffee-1f619.firebaseapp.com",
  databaseURL: "https://coffee-1f619.firebaseio.com",
  projectId: "coffee-1f619",
  storageBucket: "coffee-1f619.appspot.com",
  messagingSenderId: "848105341153",
  appId: "1:848105341153:web:a1c1d15ed850bde3"
};
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({timestampsInSnapshots:true})

  //export firestore database
  export default firebaseApp.firestore()