import { schema, solid, rdf } from 'rdf-namespaces';
import { addToTypeIndex } from './addToTypeIndex';

describe('addToTypeIndex', () => {
  it('should properly add a new type registration', () => {
    const mockTypeRegistration = { addRef: jest.fn() };
    const mockTypeIndex = { addSubject: () => mockTypeRegistration, save: jest.fn() };
    const mockDocumentToRegister = { asRef: () => 'https://some.pod/resource.ttl' };

    addToTypeIndex(mockTypeIndex as any, mockDocumentToRegister as any, schema.Movie);

    expect(mockTypeRegistration.addRef.mock.calls).toEqual([
      [rdf.type, solid.TypeRegistration],
      [solid.instance, 'https://some.pod/resource.ttl'],
      [solid.forClass, schema.Movie],
    ]);
    expect(mockTypeIndex.save.mock.calls.length).toBe(1);
  });
});
