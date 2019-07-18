import React from 'react';
import { TripleSubject } from 'tripledoc';
import { fetchProfile } from '../services/fetchProfile';

export function useProfile() {
  const [profile, setProfile] = React.useState<TripleSubject>();

  React.useEffect(() => {
    fetchProfile().then((fetchedProfile) => {
      if (fetchedProfile === null) {
        return;
      }
      setProfile(fetchedProfile);
    });
  }, []);

  return profile;
}
