import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlkWP7LgOQ5jhn_X8h_1v6bkpFK66eEcY",
    authDomain: "contato-list.firebaseapp.com",
    databaseURL: "https://contato-list-default-rtdb.firebaseio.com",
    projectId: "contato-list",
    storageBucket: "contato-list.appspot.com",
    messagingSenderId: "907668897840",
    appId: "1:907668897840:web:6d128b99344e53dc616df5"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const contatoDB = firebaseApp.database().ref().child("Contato");