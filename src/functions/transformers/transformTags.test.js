import {
  transformTagName,
  determineExpertiseFromTags,
  stripExpertiseFromTags
} from './transformTags';

describe('transformTagName', () => {
  it('returns the capitalized version for a normal tag', () => {
    expect(transformTagName('foobar')).toBe('Foobar');
  });
  it('returns the correct version for a special tag', () => {
    expect(transformTagName('javascript')).toBe('JavaScript');
  });
});

describe('determineExpertiseFromTags', () => {
  it('determines expertise from tags', () => {
    expect(determineExpertiseFromTags(['array', 'advanced'])).toBe('advanced');
  });
  it('returns default expertise if none is found', () => {
    expect(determineExpertiseFromTags(['array'])).toBe('Intermediate');
  });
});

describe('stripExpertiseFromTags', () => {
  it('strips expertise from tags', () => {
    expect(stripExpertiseFromTags(['array', 'advanced'])).toEqual(['array']);
  });
});
