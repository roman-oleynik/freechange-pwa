import {firebase} from '../firebase/firebaseConfig';

export const openSignInWithGooglePopup = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return provider;
};