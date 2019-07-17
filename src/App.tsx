import React from 'react';
import { LoggedOut, LoginButton, LoggedIn } from '@solid/react';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return <>
    <React.StrictMode>
      <LoggedOut>
        <section className="section">
          <p className="content">Please connect to your Pod to start taking notes.</p>
          <p className="content">
            <LoginButton popup="popup.html" className="button is-large is-primary">Connect</LoginButton>
          </p>
        </section>
      </LoggedOut>
      <LoggedIn>
        <Dashboard/>
      </LoggedIn>
    </React.StrictMode>
  </>;
}

export default App;
