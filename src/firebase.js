// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv4TIEgwylvfsxyWzuQvAglPoYRo1HM4o",
  authDomain: "givaassignment-b6473.firebaseapp.com",
  databaseURL: "https://givaassignment-b6473-default-rtdb.firebaseio.com",
  projectId: "givaassignment-b6473",
  storageBucket: "givaassignment-b6473.appspot.com",
  messagingSenderId: "6914685604",
  appId: "1:6914685604:web:3ee49c63fe0f7d454f0431",
  measurementId: "G-CYGKBGSHH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export function FirebaseApp(){
    return initializeApp(firebaseConfig);
}
const storage = getStorage(app);
export {storage};
