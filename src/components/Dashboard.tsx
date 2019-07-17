import React from 'react';
import { LogoutButton } from '@solid/react';

export const Dashboard: React.FC = () => {
  return <>
    <section className="section">You are logged in! You will be able to do things here.</section>
    <footer className="footer has-text-right">
      <LogoutButton className="button"/>
    </footer>
  </>;
};
