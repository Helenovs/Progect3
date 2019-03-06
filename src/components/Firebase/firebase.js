// import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    this.db = app.database();
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

   // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
