import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {

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