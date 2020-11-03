import React, { useEffect } from 'react';
import './style.scss';
import { Page } from '../../components/Page';

export function About() {
  useEffect(() => {
    document.title = "About";
  })
  return (
    <Page
      title="About"
      isMain={false}>
      <section>
        <p>This is the website for free things exchanging between users. The frontend part of it is implemented using React/Typescript/Redux, the backend - with Firebase. Users can sign in to the application through email verification or a google account. However, this is possible to use the app without any authorization anyway (all things are opened for watching and searching but if you are not registered you are not able to add things for exchanging). This app will be completed by new features. The one with the highest priority is notifications from other users with willing to exchange with you. Now the "Freechange" is on the stage of covering the main functionality by automatized tests and creating a desktop version. Then the app will proceed to fill in by new functionality.</p>
      </section>
    </Page>
  );
}

