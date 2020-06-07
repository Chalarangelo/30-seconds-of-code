import parseListingMetas from './parseListingMetas';

import { requirables } from 'fixtures/requirables';

let resultMetas;

describe('parseListingMetas', () => {
  beforeAll(() => {
    resultMetas = parseListingMetas(requirables);
  });

  it('returns an array with the correct length', () => {
    expect(resultMetas.length).toBe(2);
  });

  it('returns the correct featured state for each meta', () => {
    expect(resultMetas[0].featured).toBe(requirables[0].meta.featured);
    expect(resultMetas[1].featured).toBe(requirables[1].meta.featured);
  });
  it('returns the correct blog state for each meta', () => {
    expect(resultMetas[0].blog).toBe(requirables[0].meta.blog);
    expect(resultMetas[1].blog).toBe(requirables[1].meta.blog);
  });
  it('returns the correct link for each meta', () => {
    expect(resultMetas[0].url).toBe('/js/p/1');
    expect(resultMetas[1].url).toBe('/c-sharp/p/1');
  });
  it('returns the correct name for each meta', () => {
    expect(resultMetas[0].name).toBe('JavaScript');
    expect(resultMetas[1].name).toBe('Blog');
  });
  it('returns the correct icon for each meta', () => {
    expect(resultMetas[0].icon).toBe(requirables[0].meta.theme.iconName);
    expect(resultMetas[1].icon).toBe(undefined);
  });
  it('returns the correct slug prefx for each meta', () => {
    expect(resultMetas[0].slugPrefix).toBe('/js');
    expect(resultMetas[1].slugPrefix).toBe('/c-sharp');
  });
  it('returns the correct snippet count for each meta', () => {
    expect(resultMetas[0].count).toBe('2 snippets');
    expect(resultMetas[1].count).toBe('2 snippets');
  });
  it('returns the correct tags for each meta', () => {
    expect(resultMetas[0].tags).toEqual(['array', 'function']);
    expect(resultMetas[1].tags).toEqual(['array']);
  });
});
