import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAV_quc2qxve-cz9YE45louUMJz7Pd99_k",
    authDomain: "crown-clothing-db-bfd1d.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-bfd1d.firebaseio.com",
    projectId: "crown-clothing-db-bfd1d",
    storageBucket: "crown-clothing-db-bfd1d.appspot.com",
    messagingSenderId: "130441657011",
    appId: "1:130441657011:web:2a14784a2a7f72f054cec6",
    measurementId: "G-6KW37LQNXR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await  userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;