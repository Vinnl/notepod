import { experimental_serialise } from 'plandoc';
import { getPodData} from './getPodData';

describe('getPodData', () => {
  it('should provide the route to the Profile Document', () => {
    expect(experimental_serialise(getPodData('https://arbitrary.pod/profile.ttl#webid').profileDoc))
      .toMatchSnapshot();
  });

  it('should provide the route to the Public Type Index', () => {
    expect(experimental_serialise(getPodData('https://arbitrary.pod/profile.ttl#webid').publicTypeIndex))
      .toMatchSnapshot();
  });

  it('should provide the route to the Notes Document', () => {
    expect(experimental_serialise(getPodData('https://arbitrary.pod/profile.ttl#webid').notesDoc))
      .toMatchSnapshot();
  });

  it('should provide the given WebID', () => {
    expect(getPodData('https://arbitrary.pod/profile.ttl#webid').webId)
      .toBe('https://arbitrary.pod/profile.ttl#webid');
  });
});
