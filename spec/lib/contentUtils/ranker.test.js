import { describe, it, expect } from 'vitest';
import Ranker from '#src/lib/contentUtils/ranker.js';

describe('Ranker.rankIndexableContent', () => {
  Ranker.keywordScores = {
    foo: 2,
    bar: 4,
    baz: 1,
    sup: 98,
    abc: 1,
    bcd: 1,
    cde: 1,
    def: 1,
    efg: 1,
    ghi: 1,
    hij: 1,
    ijk: 1,
    jkl: 1,
    klm: 1,
    lmn: 1,
    mno: 1,
    nop: 1,
    opq: 1,
    pqr: 1,
    qrs: 1,
    rst: 1,
    stu: 1,
    tuv: 1,
    uvw: 1,
    vwx: 1,
    wxy: 1,
    xyz: 1,
  };

  it('should rank indexable content', () => {
    const indexableContent = 'foo bar baz';
    expect(Ranker.rankIndexableContent(indexableContent)).toBe(0.07);
  });

  it('should not exceed the keyword score limit', () => {
    const indexableContent = 'sup bar';
    expect(Ranker.rankIndexableContent(indexableContent)).toBe(1);
  });

  it('should not exceed the keyword count limit', () => {
    const indexableContent =
      'abc bcd cde def efg ghi hij ijk jkl klm lmn mno nop opq pqr qrs rst stu tuv uvw vwx wxy xyz';
    expect(Ranker.rankIndexableContent(indexableContent)).toBe(0.2);
  });
});
