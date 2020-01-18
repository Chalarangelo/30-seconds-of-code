import {
  determineExpertiseFromTags,
  stripExpertiseFromTags
} from './transformTags';

describe('determineExpertiseFromTags', () => {
  it('determines expertise from tags', () => {
    expect(determineExpertiseFromTags(['array', 'advanced'])).toBe('advanced');
  });
  it('returns default expertise if none is found', () => {
    expect(determineExpertiseFromTags(['array'])).toBe('intermediate');
  });
});

describe('stripExpertiseFromTags', () => {
  it('strips expertise from tags', () => {
    expect(stripExpertiseFromTags(['array', 'advanced'])).toEqual(['array']);
  });
});
