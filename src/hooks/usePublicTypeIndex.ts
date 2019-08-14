import React from 'react';
import { TripleDocument } from 'tripledoc';
import { fetchPublicTypeIndex } from '../services/fetchPublicTypeIndex';

export function usePublicTypeIndex() {
  const [publicTypeIndex, setPublicTypeIndex] = React.useState<TripleDocument>();

  React.useEffect(() => {
    fetchPublicTypeIndex().then(fetchedPublicTypeIndex => {
      if (fetchedPublicTypeIndex === null) {
        return;
      }
      setPublicTypeIndex(fetchedPublicTypeIndex);
    });
  }, []);

  return publicTypeIndex;
}
