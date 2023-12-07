import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEqNYDSHyGywZM41PYDeT3O1krIM-BCm4",
    authDomain: "health-care-f0359.firebaseapp.com",
    databaseURL: "https://health-care-f0359-default-rtdb.firebaseio.com",
    projectId: "health-care-f0359",
    storageBucket: "health-care-f0359.appspot.com",
    messagingSenderId: "983411591831",
    appId: "1:983411591831:web:bc28e27cc58fb15e92f7d2",
    measurementId: "G-YYSGX6TL7G"
  };

const app = initializeApp(firebaseConfig);

export default app;