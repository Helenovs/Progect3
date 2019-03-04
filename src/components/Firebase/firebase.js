// import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBFLsBsYruDOWH003E0jvghqw4e_PocED8",
    authDomain: "messengerdb-777eb.firebaseapp.com",
    databaseURL: "https://messengerdb-777eb.firebaseio.com",
    projectId: "messengerdb-777eb",
    storageBucket: "messengerdb-777eb.appspot.com",
    messagingSenderId: "875521669810"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
   this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
   this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
   this.auth.currentUser.updatePassword(password);
}

export default Firebase;
