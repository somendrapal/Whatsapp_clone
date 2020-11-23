import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBARru3V2FN9sw0P0yK3nD-R0hTwYRvVio",
    authDomain: "what-s-app-b85d8.firebaseapp.com",
    databaseURL: "https://what-s-app-b85d8.firebaseio.com",
    projectId: "what-s-app-b85d8",
    storageBucket: "what-s-app-b85d8.appspot.com",
    messagingSenderId: "496063932570",
    appId: "1:496063932570:web:938ebc3b6345b4b2825723",
    measurementId: "G-5FSCPDM54P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth= firebase.auth();
  const provider=new firebase.auth.
  GoogleAuthProvider();
export {auth,provider};
export default db;