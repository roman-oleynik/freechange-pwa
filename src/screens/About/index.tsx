import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
        <p>About content</p>
      </section>
    </Page>
  );
}

