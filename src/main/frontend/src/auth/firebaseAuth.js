import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import firebaseKey from '../config/aiple-firebase-key.json';

firebase.initializeApp(firebaseKey);
export const auth = firebase.auth();

export const signInGoogle= () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
}

export const signOut = () => {
    console.log('signOut');
    return auth.signOut();
}