import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxOb00b7LjuhrHrClWEnx2r-1twugeaFA",
  authDomain: "zapappdefinitivo.firebaseapp.com",
  projectId: "zapappdefinitivo",
  storageBucket: "zapappdefinitivo.appspot.com",
  messagingSenderId: "899267975215",
  appId: "1:899267975215:web:ff50bbae76ba112f5b4eda"
};

let app;

if (firebase.apps.length === 0) 
{
  app = firebase.initializeApp(firebaseConfig)
}
else
{
  app = firebase.app();
}

const banco = app.firestore();
const auth = firebase.auth();

export { banco, auth };