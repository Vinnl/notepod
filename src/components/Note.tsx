import React from 'react';
import Markdown from 'react-markdown';
import { TripleSubject } from 'plandoc';
import { schema } from 'rdf-namespaces';

interface Props {
  note: TripleSubject;
  onChange: (updatedContent: string) => Promise<TripleSubject | undefined>;
  onCancelEdit: () => void;
  mode?: 'viewing' | 'editing';
};

export const Note: React.FC<Props> = (props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [note, setNote] = React.useState(props.note.getString(schema.text));
  const [formContent, setFormContent] = React.useState(note || '');

  const saveNote: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    const updatedNote = await props.onChange(formContent);
    if (updatedNote) {
      setNote(updatedNote.getString(schema.text));
    }
    setIsSubmitting(false);
  };

  const cancelEdit: React.MouseEventHandler = (event) => {
    props.onCancelEdit();
  };

  if (props.mode === 'editing') {
    const isLoading = isSubmitting ? 'is-loading' : '';

    const newLines = formContent.match(/\n/g) ?? [];
    const textareaRows = newLines ? Math.min(Math.max(newLines.length + 1, 5), 25) : 5;

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
              rows={textareaRows}
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
    <article className="card">
      <div className="section content">
        <Markdown source={note || ''}/>
      </div>
    </article>
  </>;
};
