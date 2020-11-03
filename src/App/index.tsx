import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPageOfThings } from '../screens/MainPageOfThings';
import Navbar from '../components/Navbar/NavbarContainer';
import { ThingPage } from '../screens/ThingPage';
import OwnerPage from '../screens/OwnerPage';
import { About } from '../screens/About';
import UserProfile from '../screens/UserProfile';
import { fetchLoggedOwner } from '../actions/ownersActions';
import { getLocalStorageItem } from '../modules/localStorageAPI';
import UserSettings from '../screens/UserSettings';
import { LoginDialog } from '../screens/LoginDialog';
import { SignUpDialog } from '../screens/SignUpDialog';
import { AddThingDialog } from '../screens/AddThingDialog';
import EditThingDialog from '../screens/EditThingDialog';
import { database } from '../firebase/firebaseConfig';
import { State } from '../types/types';
import { setOnlineStatus } from '../actions/thingsActions';
import { withGoogleSigningIn } from '../HOCs/withGoogleSigningIn';
import { BusyIndicator } from '../components/BusyIndicator';
import { PageOfFreeThings } from '../screens/PageOfFreeThings';
import { PageOfSearchThings } from '../screens/PageOfSearchThings';
import { ErrorPage } from '../screens/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import 'normalize.css';





export function App({ location }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedOwnerId: string | null = getLocalStorageItem("loggedUser");
    if (loggedOwnerId ) {
      dispatch(fetchLoggedOwner(loggedOwnerId));
    }
  }, []);
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch location={location}>
            <Route path="/" exact component={MainPageOfThings} />
            <Route path="/free" component={PageOfFreeThings} />
            <Route path="/search" component={PageOfSearchThings} />
            <Route path="/login" component={withGoogleSigningIn(LoginDialog)} />
            <Route path="/signup" component={withGoogleSigningIn(SignUpDialog)} />
            <Route path="/about" component={About} />
            <Route path="/thing/:thingId" component={ThingPage} />
            <Route path="/owner/:ownerId" component={OwnerPage} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/profile/addThing" component={AddThingDialog} />
            <Route path="/profile/editThing/:thingId" component={EditThingDialog} />
            <Route path="/settings" component={UserSettings} />
            <Route path="/error" component={ErrorPage} />
          </Switch>
        </main>
      </>
    );
}


