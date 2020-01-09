import React from 'react';
import { TripleSubject, TripleDocument } from 'plandoc';
import { schema } from 'rdf-namespaces';
import deleteIcon from 'material-design-icons/action/svg/production/ic_delete_48px.svg';
import { addNote } from '../services/addNote';
import { Note } from './Note';
import { PodData } from '../services/getPodData';
import { useDocument } from '../hooks/useDocument';

interface Props {
  podData: PodData;
};

export const NotesList: React.FC<Props> = (props) => {
  const [notesList, updateNotesList] = useDocument(props.podData.notesDoc);
  const [formContent, setFormContent] = React.useState('');

  if (!notesList) {
    return null;
  }
  const notes = getNotes(notesList);

  async function saveNote(event: React.FormEvent) {
    event.preventDefault();
    if (!notesList) {
      return;
    }
    const updatedDoc = await addNote(formContent, notesList);
    updateNotesList(updatedDoc);
    setFormContent('');
  }

  async function editNote(content: string, note: TripleSubject) {
    const notesDocument = notesList;
    if (!notesDocument) {
      return;
    }

    note.setString(schema.text, content);
    note.setDateTime(schema.dateModified, new Date(Date.now()));
    const updatedDoc = await notesDocument.save();
    updateNotesList(updatedDoc);
    return updatedDoc.getSubject(note.asRef());
  }

  async function deleteNote(note: TripleSubject) {
    const notesDocument = notesList;
    if (!notesDocument) {
      return;
    }

    notesDocument.removeSubject(note.asRef());
    const updatedDoc = await notesDocument.save();
    updateNotesList(updatedDoc);
  }

  const noteElements = notes.sort(byDate).map((note) => (
    <div key={note.asRef()} className="media">
      <div className="media-content">
        <Note
          note={note}
          onChange={(updatedContent) => editNote(updatedContent, note)}
        />
        <p className="has-text-right">
          <button
            onClick={() => deleteNote(note)}
            title="Delete this note"
            className="button is-text"
            style={{textDecoration: 'none'}}
          >
            <span className="icon is-small">
              <img src={deleteIcon} alt="Delete this note"/>
            </span>
          </button>
        </p>
      </div>
    </div>
  ));

  const newLines = formContent.match(/\n/g) ?? [];
  const textareaRows = newLines ? Math.min(Math.max(newLines.length + 1, 5), 25) : 5;

  return (
    <>
      <section className="section">
        <form onSubmit={saveNote}>
          <div className="field">
            <div className="control">
              <textarea
                onChange={(e) => { e.preventDefault(); setFormContent(e.target.value); }}
                name="note"
                id="note"
                className="textarea"
                value={formContent}
                rows={textareaRows}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">Add note</button>
            </div>
          </div>
        </form>
      </section>
      <section className="section">
        {noteElements}
      </section>
    </>
  );
};

function byDate(note1: TripleSubject, note2: TripleSubject): number {
  const date1 = note1.getDateTime(schema.dateCreated);
  const date2 = note2.getDateTime(schema.dateCreated);
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return 0;
  }

  return date2.getTime() - date1.getTime();
}

function getNotes(notesList: TripleDocument): TripleSubject[] {
  return notesList.getSubjectsOfType(schema.TextDigitalDocument);
}
