import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyD7qlRtJFMoX3kS3meXSTVK5FJyLYSjQZE",
    authDomain: "chat-app-b6c92.firebaseapp.com",
    databaseURL: "https://chat-app-b6c92-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-b6c92",
    storageBucket: "chat-app-b6c92.appspot.com",
    messagingSenderId: "813309308115",
    appId: "1:813309308115:web:f894823381c23bed0ab826",
    measurementId: "G-BYW0P6GBV7"
  };

  const app = initializeApp(firebaseConfig)
  const db = getDatabase()
  export {db}