import { firebase, auth } from '../firebase/firebaseConfig';
import React, { FunctionComponent, ReactChildren } from 'react';
import { openSignInWithGooglePopup } from '../modules/signInWithGooglePopup';
import { Owner, State } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedOwner } from '../actions/ownersActions';
import { setLocalStorageItem } from '../modules/localStorageAPI';
import { Redirect } from 'react-router-dom';
import google from '../assets/google-logo.png';
import { DATABASE } from '../firebase/databaseAPI';


export function withGoogleSigningIn(Component: FunctionComponent<any>): FunctionComponent<any> {
  type Props = {
    children: ReactChildren,
  };
  const styles = {
    container: {
      height: "40px",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      border: 0,
      boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)"
    },
    image: {
      height: "30px",
      width: "30px",
    },
  }
  return function ({ children }: Props) {
    const dispatch = useDispatch();

    const loggedOwner = useSelector((state: State) => state.loggedOwner);

    const logUserIn = (loggedOwnerId: string) => {
      setLocalStorageItem("loggedUser", loggedOwnerId);
      dispatch(fetchLoggedOwner(loggedOwnerId));
    };
    
    const signInWithGoogle = async () => {
      const popup = await openSignInWithGooglePopup();

      try {
        const result = await auth.signInWithPopup(popup);

        const {user, additionalUserInfo} = result;
        const userProfile = additionalUserInfo?.profile as any;
        
        if (additionalUserInfo?.isNewUser) {
          const ownerPayload: Owner = {
            id: user?.uid as string,
            key: "",
            name: user?.displayName as string,
            email: userProfile.email,
            location: "",
            phoneNumber: "",
            avatar: user?.photoURL as string,
          };
          DATABASE.addOwner(ownerPayload);
        }
        
        logUserIn(user?.uid as string);
      } 
      catch (err) {
        console.log(err);
      }
    }
    if ( loggedOwner ) {
      return <Redirect to="/" />;
    }
    return (
      <Component>
        {children}
        <button
          onClick={signInWithGoogle}
          style={styles.container}>
          <img
            src={google}
            alt="Google"
            style={styles.image}
          />
        </button>
      </Component>
    );
  }
}