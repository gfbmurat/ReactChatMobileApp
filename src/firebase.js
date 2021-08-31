import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

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
const app = initializeApp(firebaseConfig);

export default firebase