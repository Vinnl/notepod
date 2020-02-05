import { TripleDocument } from 'tripledoc';
import { rdf, schema } from 'rdf-namespaces';

export async function addNote(note: string, notesList: TripleDocument): Promise<TripleDocument> {
  const newNote = notesList.addSubject();
  newNote.addRef(rdf.type, schema.TextDigitalDocument);
  newNote.addString(schema.text, note);
  newNote.addDateTime(schema.dateCreated, new Date(Date.now()))

  return await notesList.save([newNote]);
}
