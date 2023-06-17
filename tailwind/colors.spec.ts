import colors from './colors.cjs';

describe('theme', () => {
  it('should have color definitions', () => {
    expect(Object.keys(colors)).toEqual([
      'primary',
      'secondary',
      'highlight',
      'compliment',
    ]);
  });
});
