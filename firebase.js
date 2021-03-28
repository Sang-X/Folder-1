import firebase from "firebase"; /* {firebase/app} */
import "firebase/firestore";
import "firebase/auth"; 
//import {LogBox} from "react-native";

var firebaseConfig = {
    apiKey: "AIzaSyAV0yuB__BfqobaJ38RhiHOs_EKXgSJ1yM",
    authDomain: "sovidar.firebaseapp.com",
    projectId: "sovidar",
    storageBucket: "sovidar.appspot.com",
    messagingSenderId: "900683622596",
    appId: "1:900683622596:web:299a9c662c777956f54191"
  };
  
  
let app;

if (firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app();
}
//LogBox.ignoreWarnings(["Setting a timer for a long period of time"])
const db=app.firestore();
const auth=firebase.auth();

export{db,auth};
