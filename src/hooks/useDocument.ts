import React from 'react';
import { TripleDocument, fetchDocument, VirtualDocument } from 'plandoc';

export function useDocument(virtualDocument: VirtualDocument) {
  const [document, setDocument] = React.useState<TripleDocument | null>();

  React.useEffect(() => {
    fetchDocument(virtualDocument).then(setDocument);
  }, [virtualDocument]);

  return [document, setDocument] as const;
}
