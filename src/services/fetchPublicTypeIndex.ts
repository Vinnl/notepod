import { fetchProfile } from './fetchProfile';
import { fetchDocument } from 'tripledoc';
import { solid } from 'rdf-namespaces';

export async function fetchPublicTypeIndex () {
  const profile = await fetchProfile();
  if (profile === null) {
    return null;
  }

  const publicTypeIndexUrl = profile.getRef(solid.publicTypeIndex);
  if (!publicTypeIndexUrl || typeof publicTypeIndexUrl !== 'string') {
    return null;
  }

  const document = await fetchDocument(publicTypeIndexUrl);
  return document;
}
