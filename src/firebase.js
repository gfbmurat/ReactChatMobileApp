import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBiTgALqo12PgIR5cHx8k7buIUL_L2xg1s",
    authDomain: "reacttailwindchatmobile.firebaseapp.com",
    databaseURL: "https://reacttailwindchatmobile-default-rtdb.firebaseio.com",
    projectId: "reacttailwindchatmobile",
    storageBucket: "reacttailwindchatmobile.appspot.com",
    messagingSenderId: "356321874844",
    appId: "1:356321874844:web:dec3bd62c0b09a8816ee59"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase