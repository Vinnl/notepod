import React from 'react';
import { LoggedOut, LoggedIn } from '@solid/react';
import { Dashboard } from './components/Dashboard';
import { PodConnecter } from './components/PodConnecter';

const App: React.FC = () => {
  return <>
    <React.StrictMode>
      <LoggedOut>
        <section className="section">
          <p className="content">Please connect to your Pod to start taking notes.</p>
          <p className="content">
            <PodConnecter/>
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
