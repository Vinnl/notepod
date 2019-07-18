import React from 'react';
import { LogoutButton } from '@solid/react';
import { foaf } from 'rdf-namespaces';
import { useProfile } from '../hooks/useProfile';

export const Dashboard: React.FC = () => {
  const profile = useProfile();

  const name = (profile) ? profile.getString(foaf.name) : null;
  const greeting = (name)
    ? `Hi ${name}`
    : 'Hi';

  return <>
    <section className="section">
      {greeting}
    </section>
    <footer className="footer has-text-right">
      <LogoutButton className="button"/>
    </footer>
  </>;
};
