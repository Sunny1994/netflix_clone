import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCPCaokeoVvvWW59Z_9IVPSZXBKiSGYdrs",
    authDomain: "netflix-71fb3.firebaseapp.com",
    projectId: "netflix-71fb3",
    storageBucket: "netflix-71fb3.appspot.com",
    messagingSenderId: "260832915126",
    appId: "1:260832915126:web:a21ebcfdea119678cdc017",
    measurementId: "G-KSC0VJE08Q"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig)

  const db= firebaseApp.firestore()

  const auth= firebase.auth() 

  export {db,auth}

 


  