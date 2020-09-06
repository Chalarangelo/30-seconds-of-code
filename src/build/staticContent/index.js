import { createIndexChunk, writeChunks } from 'build/json';

export const compileStaticData = (outPath, slug, template, priority, context = {}) =>
  writeChunks(
    `${outPath}${slug}`,
    ['index', createIndexChunk(slug, template, priority)],
    ['context', context]
  );
