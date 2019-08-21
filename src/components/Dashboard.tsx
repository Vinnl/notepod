import React from 'react';
import { LogoutButton } from '@solid/react';
import { foaf } from 'rdf-namespaces';
import { useProfile } from '../hooks/useProfile';
import { NotesList } from './NotesList';

export const Dashboard: React.FC = () => {
  const profile = useProfile();

  const name = (profile) ? profile.getString(foaf.name) : null;
  const title = (name)
    ? `Public notes by ${name}`
    : 'Public notes';

  return <>
    <section className="section">
      <h1 className="title">
        {title}
      </h1>
    </section>
    <NotesList/>
    <footer className="footer has-text-right">
      <LogoutButton className="button"/>
    </footer>
  </>;
};
