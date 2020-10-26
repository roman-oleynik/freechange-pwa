import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCDZJcnmDqrh_oVYQWyYO_F5AKKIyGslZE",
    authDomain: "freechange.firebaseapp.com",
    databaseURL: "https://freechange.firebaseio.com",
    projectId: "freechange",
    storageBucket: "freechange.appspot.com",
    messagingSenderId: "3139063443",
    appId: "1:3139063443:web:bbbab49702c06d717f8766",
    measurementId: "G-WS4DKJ8XJK"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();

export {
  database, firebase, auth, storage
}