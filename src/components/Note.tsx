import React from 'react';
import Markdown from 'react-markdown';
import { TripleSubject } from 'tripledoc';
import { schema } from 'rdf-namespaces';

interface Props {
  note: TripleSubject;
  onChange: (updatedContent: string) => Promise<TripleSubject | undefined>;
};

export const Note: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [note, setNote] = React.useState(props.note.getString(schema.text));
  const [formContent, setFormContent] = React.useState(note || '');

  const saveNote: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    const updatedNote = await props.onChange(formContent);
    if (updatedNote) {
      setNote(updatedNote.getString(schema.text));
      // Only stop editing if the note was saved successfully:
      setIsEditing(false);
    }
    setIsSubmitting(false);
  };

  const cancelEdit: React.MouseEventHandler = (event) => {
    setIsEditing(false);
  };

  if (isEditing) {
    const isLoading = isSubmitting ? 'is-loading' : '';

    return <>
      <form onSubmit={saveNote} className="content">
        <div className="field">
          <div className="control">
            <textarea
              onChange={(e) => { e.preventDefault(); setFormContent(e.target.value); }}
              name="note"
              id="note"
              className="textarea"
              value={formContent}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary ${isLoading}`}
              disabled={isSubmitting}
            >Save</button>
          </div>
          <div className="control">
            <button onClick={cancelEdit} className="button is-text">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>;
  }

  return <>
    <article
      className="card"
      role="button"
      style={{cursor: 'pointer'}}
      onClick={() => setIsEditing(true)}
    >
      <div className="section content">
        <Markdown source={note || ''}/>
      </div>
    </article>
  </>;
};
