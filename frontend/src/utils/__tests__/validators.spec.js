import { required } from '../validators';

describe('validators #required', () => {
  it('should return false when value is empty string', () => {
    expect(required('')).toBeFalsy();
  });

  it('should return true when value is defined string', () => {
    expect(required(' test ')).toBeTruthy();
  });
});
