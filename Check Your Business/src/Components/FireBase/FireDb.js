import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import database from "firebase/database";

const Fbconfig = {
  apiKey: "AIzaSyA8eB8xt1cDdwSyGIIDs1LinRu4hpHOH5I",
  authDomain: "productinventory-3b07d.firebaseapp.com",
  databaseURL:
    "https://productinventory-3b07d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "productinventory-3b07d",
  storageBucket: "productinventory-3b07d.appspot.com",
  messagingSenderId: "17848299694",
  appId: "1:17848299694:web:b682fab5dbcd78cae5bd3f"
};

const app = initializeApp(Fbconfig);

const FbAuth = getAuth();
var EmailPass = signInWithEmailAndPassword;

// export { FbAuth, FbDatabase };
export { FbAuth, EmailPass };
