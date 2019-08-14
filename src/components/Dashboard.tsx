import React from 'react';
import { LogoutButton } from '@solid/react';
import { foaf } from 'rdf-namespaces';
import { useProfile } from '../hooks/useProfile';
import { useNotesList, getNotes  } from '../hooks/useNotesList';

export const Dashboard: React.FC = () => {
  const profile = useProfile();
  const notesList = useNotesList();

  const name = (profile) ? profile.getString(foaf.name) : null;
  const greeting = (name)
    ? `Hi ${name}`
    : 'Hi';

  const noteCount = notesList
    ? <p>You have {getNotes(notesList).length} notes.</p>
    : null;

  return <>
    <section className="section">
      <p>
        {greeting}
      </p>
      {noteCount}
    </section>
    <footer className="footer has-text-right">
      <LogoutButton className="button"/>
    </footer>
  </>;
};
