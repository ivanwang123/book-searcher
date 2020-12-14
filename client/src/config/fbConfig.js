import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "books-bb0cd.firebaseapp.com",
    databaseURL: "https://books-bb0cd.firebaseio.com",
    projectId: "books-bb0cd",
    storageBucket: "books-bb0cd.appspot.com",
    messagingSenderId: "1003874445438",
    appId: "1:1003874445438:web:21947c7f2a5e17873c902f",
    measurementId: "G-QYJZ632PXV"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();
firebase.auth();

// firebase.analytics();

export default firebase;