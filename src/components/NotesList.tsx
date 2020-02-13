import React from 'react';
import { TripleSubject, TripleDocument, Reference } from 'plandoc';
import { schema } from 'rdf-namespaces';
import editIcon from 'material-design-icons/image/svg/production/ic_edit_48px.svg';
import deleteIcon from 'material-design-icons/action/svg/production/ic_delete_48px.svg';
import { addNote } from '../services/addNote';
import { Note } from './Note';
import { PodData } from '../services/getPodData';
import { useDocument } from '../hooks/useDocument';
import { NewNote } from './NewNote';

interface Props {
  podData: PodData;
};

export const NotesList: React.FC<Props> = (props) => {
  const [notesList, updateNotesList] = useDocument(props.podData.notesDoc);
  const [notesInEditMode, setEditMode] = React.useReducer(
    (prevState: Reference[], [note, editMode]: [Reference, boolean]) => {
      if (editMode) {
        return prevState.concat(note);
      }
      return prevState.filter((ref: Reference) => ref !== note);
    },
    [] as Reference[],
  );

  if (!notesList) {
    return null;
  }
  const notes = getNotes(notesList);

  async function saveNote(content: string) {
    if (!notesList) {
      return;
    }
    const updatedDoc = await addNote(content, notesList);
    updateNotesList(updatedDoc);
  }

  async function editNote(content: string, note: TripleSubject) {
    const notesDocument = notesList;
    if (!notesDocument) {
      return;
    }

    note.setString(schema.text, content);
    note.setDateTime(schema.dateModified, new Date(Date.now()));
    const updatedDoc = await notesDocument.save();
    if (updatedDoc) {
      setEditMode([note.asRef(), false])
      updateNotesList(updatedDoc);
    }
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
    <React.Fragment key={note.asRef()}>
      <div className="columns">
        <div className="column">
          <Note
            note={note}
            onChange={(updatedContent) => editNote(updatedContent, note)}
            onCancelEdit={() => setEditMode([note.asRef(), false])}
            mode={notesInEditMode.includes(note.asRef()) ? 'editing' : 'viewing'}
          />
        </div>
        <div className="column is-narrow is-2-desktop">
          <nav className="panel">
            {/* Bulma expects an <a>, so I added role="button":  */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={() => setEditMode([note.asRef(), true])}
              title="Edit this note"
              className="panel-block"
              role="button"
            >
              <span className="panel-icon">
                <img src={editIcon} alt=""/>
              </span>
              Edit
            </a>
            {/* Bulma expects an <a>, so I added role="button":  */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={() => deleteNote(note)}
              title="Delete this note"
              className="panel-block"
              role="button"
            >
              <span className="panel-icon">
                <img src={deleteIcon} alt=""/>
              </span>
              Delete
            </a>
          </nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  ));

  return (
    <>
      <section className="section">
        <NewNote onSave={saveNote}/>
      </section>
      <section className="section">
        {noteElements}
      </section>
    </>
  );
};

function byDate(noteA: TripleSubject, noteB: TripleSubject) {
  const updatedDateA = noteA.getDateTime(schema.dateModified);
  const updatedDateB = noteB.getDateTime(schema.dateModified);
  const createdDateA = noteA.getDateTime(schema.dateCreated);
  const createdDateB = noteB.getDateTime(schema.dateCreated);

  const latestA = updatedDateA ?? createdDateA;
  const latestB = updatedDateB ?? createdDateB;
  if (latestB === null) {
    // No date known for B - A comes first
    return -1;
  }
  if (latestA === null) {
    // Date known for B but not for A - B comes first
    return 1;
  }

  // Whichever was latest comes first:
  return latestB.getTime() - latestA.getTime();
}

function getNotes(notesList: TripleDocument): TripleSubject[] {
  return notesList.getSubjectsOfType(schema.TextDigitalDocument);
}
