import { schema,  rdf } from 'rdf-namespaces';
import { addNote } from './addNote';

describe('addNote', () => {
  it('should properly add a new type registration', () => {
    const mockNewNote = { addRef: jest.fn(), addString: jest.fn(), addDateTime: jest.fn() };
    const mockNotesDoc = { addSubject: () => mockNewNote, save: jest.fn() };

    addNote('Some note', mockNotesDoc as any);

    expect(mockNewNote.addRef.mock.calls).toEqual([
      [rdf.type, schema.TextDigitalDocument],
    ]);
    expect(mockNewNote.addString.mock.calls.length).toBe(1);
    expect(mockNewNote.addString.mock.calls[0]).toEqual([
      schema.text,
      'Some note',
    ]);
    expect(mockNewNote.addDateTime.mock.calls.length).toBe(1);
    expect(mockNewNote.addDateTime.mock.calls[0][0]).toBe(schema.dateCreated);
    expect(mockNewNote.addDateTime.mock.calls[0][1]).toBeInstanceOf(Date);
    expect(mockNotesDoc.save.mock.calls.length).toBe(1);
  });
});
