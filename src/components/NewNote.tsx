import React from 'react';

interface Props {
  onSave: (content: string) => Promise<void>;
};

export const NewNote: React.FC<Props> = (props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formContent, setFormContent] = React.useState('');

  const saveNote: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await props.onSave(formContent);
    setFormContent('');
    setIsSubmitting(false);
  };

  const isLoading = isSubmitting ? 'is-loading' : '';
  const newLines = formContent.match(/\n/g) ?? [];
  const textareaRows = newLines ? Math.min(Math.max(newLines.length + 1, 5), 25) : 5;

  return <>
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
          <button
            type="submit"
            className={`button is-primary ${isLoading}`}
            disabled={isSubmitting}
          >Add note</button>
        </div>
      </div>
    </form>
  </>;
};
