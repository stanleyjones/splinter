import './mocks/LocalStorageMock';
import Splinter from './Splinter';

describe('Splinter', () => {
  it('exports a singleton', () => {
    expect(Splinter).toBeDefined();
  });
});