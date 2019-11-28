import React from 'react';
import { LoginButton } from '@solid/react';
import SolidAuth from 'solid-auth-client';

const suggestedWebId = (URLSearchParams && document.location.search)
  ? (new URLSearchParams(document.location.search)).get('webid')
  : null;

export const PodConnecter: React.FC = () => {
  const [chosenWebId, setWebId] = React.useState(suggestedWebId);

  if (suggestedWebId) {
    const login = () => {
      if (!chosenWebId) {
        return;
      }

      SolidAuth.login(chosenWebId);
    }

    return (
      <form onSubmit={(event) => {event.preventDefault(); login(); }}>
        <div className="field">
          <div className="control">
            <label htmlFor="webid" className="label">Your WebID:</label>
            <input
              type="url"
              name="webid"
              id="webid"
              className="input is-large"
              value={chosenWebId || ''}
              onChange={(e) => { e.preventDefault(); setWebId(e.target.value); }}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input type="submit" className="button is-primary is-large" value="Connect"/>
          </div>
        </div>
      </form>
    );
  }

  return <>
    <LoginButton popup="popup.html" className="button is-large is-primary">Connect</LoginButton>
  </>;
}
