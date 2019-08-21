import { TripleDocument } from 'tripledoc';
import { rdf, schema } from 'rdf-namespaces';

export async function addNote(note: string, notesList: TripleDocument): Promise<TripleDocument> {
  const newNote = notesList.addSubject();
  newNote.addRef(rdf.type, schema.TextDigitalDocument);
  newNote.addLiteral(schema.text, note);
  newNote.addLiteral(schema.dateCreated, new Date(Date.now()))

  return await notesList.save([newNote]);
}
