import { describeSubject, VirtualDocument, describeDocument, describeContainer, Reference } from 'plandoc';
import { space, solid, rdf, schema } from 'rdf-namespaces';

export type PodData = {
  webId: Reference,
  profileDoc: VirtualDocument,
  publicTypeIndex: VirtualDocument,
  notesDoc: VirtualDocument,
};

export function getPodData(webId: string): PodData {
  const profileDoc = describeDocument().isFoundAt(webId);
  const profile = describeSubject().isFoundAt(webId);

  const storage = describeContainer().isFoundOn(profile, space.storage);

  const publicTypeIndex = describeDocument().isFoundOn(profile, solid.publicTypeIndex)

  const notesTypeRegistration = describeSubject()
    .isEnsuredIn(publicTypeIndex)
    .withRef(rdf.type, solid.TypeRegistration)
    .withRef(solid.forClass, schema.TextDigitalDocument);

  const notesDoc = describeDocument()
    .isEnsuredOn(notesTypeRegistration, solid.instance, storage);

  return {
    webId,
    profileDoc,
    publicTypeIndex,
    notesDoc,
  };
}
