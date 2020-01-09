import React from 'react';
import { PodData } from '../services/getPodData';
import { TripleSubject, fetchDocument } from 'plandoc';

export function useProfile(podData?: PodData) {
  const [profile, setProfile] = React.useState<TripleSubject>();

  React.useEffect(() => {
    if (!podData) {
      return;
    }

    fetchDocument(podData.profileDoc).then((fetchedProfileDoc) => {
      const profile = fetchedProfileDoc?.getSubject(podData.webId);
      if (!fetchedProfileDoc || !profile) {
        return;
      }
      setProfile(profile);
    });
  }, [podData]);

  return profile;
}
