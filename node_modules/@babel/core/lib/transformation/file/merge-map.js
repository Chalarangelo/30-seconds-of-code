"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeSourceMap;

function _sourceMap() {
  const data = _interopRequireDefault(require("source-map"));

  _sourceMap = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeSourceMap(inputMap, map) {
  const input = buildMappingData(inputMap);
  const output = buildMappingData(map);
  const mergedGenerator = new (_sourceMap().default.SourceMapGenerator)();

  for (const _ref of input.sources) {
    const {
      source
    } = _ref;

    if (typeof source.content === "string") {
      mergedGenerator.setSourceContent(source.path, source.content);
    }
  }

  if (output.sources.length === 1) {
    const defaultSource = output.sources[0];
    const insertedMappings = new Map();
    eachInputGeneratedRange(input, (generated, original, source) => {
      eachOverlappingGeneratedOutputRange(defaultSource, generated, item => {
        const key = makeMappingKey(item);
        if (insertedMappings.has(key)) return;
        insertedMappings.set(key, item);
        mergedGenerator.addMapping({
          source: source.path,
          original: {
            line: original.line,
            column: original.columnStart
          },
          generated: {
            line: item.line,
            column: item.columnStart
          },
          name: original.name
        });
      });
    });

    for (const item of insertedMappings.values()) {
      if (item.columnEnd === Infinity) {
        continue;
      }

      const clearItem = {
        line: item.line,
        columnStart: item.columnEnd
      };
      const key = makeMappingKey(clearItem);

      if (insertedMappings.has(key)) {
        continue;
      }

      mergedGenerator.addMapping({
        generated: {
          line: clearItem.line,
          column: clearItem.columnStart
        }
      });
    }
  }

  const result = mergedGenerator.toJSON();

  if (typeof input.sourceRoot === "string") {
    result.sourceRoot = input.sourceRoot;
  }

  return result;
}

function makeMappingKey(item) {
  return `${item.line}/${item.columnStart}`;
}

function eachOverlappingGeneratedOutputRange(outputFile, inputGeneratedRange, callback) {
  const overlappingOriginal = filterApplicableOriginalRanges(outputFile, inputGeneratedRange);

  for (const _ref2 of overlappingOriginal) {
    const {
      generated
    } = _ref2;

    for (const item of generated) {
      callback(item);
    }
  }
}

function filterApplicableOriginalRanges({
  mappings
}, {
  line,
  columnStart,
  columnEnd
}) {
  return filterSortedArray(mappings, ({
    original: outOriginal
  }) => {
    if (line > outOriginal.line) return -1;
    if (line < outOriginal.line) return 1;
    if (columnStart >= outOriginal.columnEnd) return -1;
    if (columnEnd <= outOriginal.columnStart) return 1;
    return 0;
  });
}

function eachInputGeneratedRange(map, callback) {
  for (const _ref3 of map.sources) {
    const {
      source,
      mappings
    } = _ref3;

    for (const _ref4 of mappings) {
      const {
        original,
        generated
      } = _ref4;

      for (const item of generated) {
        callback(item, original, source);
      }
    }
  }
}

function buildMappingData(map) {
  const consumer = new (_sourceMap().default.SourceMapConsumer)(Object.assign({}, map, {
    sourceRoot: null
  }));
  const sources = new Map();
  const mappings = new Map();
  let last = null;
  consumer.computeColumnSpans();
  consumer.eachMapping(m => {
    if (m.originalLine === null) return;
    let source = sources.get(m.source);

    if (!source) {
      source = {
        path: m.source,
        content: consumer.sourceContentFor(m.source, true)
      };
      sources.set(m.source, source);
    }

    let sourceData = mappings.get(source);

    if (!sourceData) {
      sourceData = {
        source,
        mappings: []
      };
      mappings.set(source, sourceData);
    }

    const obj = {
      line: m.originalLine,
      columnStart: m.originalColumn,
      columnEnd: Infinity,
      name: m.name
    };

    if (last && last.source === source && last.mapping.line === m.originalLine) {
      last.mapping.columnEnd = m.originalColumn;
    }

    last = {
      source,
      mapping: obj
    };
    sourceData.mappings.push({
      original: obj,
      generated: consumer.allGeneratedPositionsFor({
        source: m.source,
        line: m.originalLine,
        column: m.originalColumn
      }).map(item => ({
        line: item.line,
        columnStart: item.column,
        columnEnd: item.lastColumn + 1
      }))
    });
  }, null, _sourceMap().default.SourceMapConsumer.ORIGINAL_ORDER);
  return {
    file: map.file,
    sourceRoot: map.sourceRoot,
    sources: Array.from(mappings.values())
  };
}

function findInsertionLocation(array, callback) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const item = array[mid];
    const result = callback(item);

    if (result === 0) {
      left = mid;
      break;
    }

    if (result >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  let i = left;

  if (i < array.length) {
    while (i >= 0 && callback(array[i]) >= 0) {
      i--;
    }

    return i + 1;
  }

  return i;
}

function filterSortedArray(array, callback) {
  const start = findInsertionLocation(array, callback);
  const results = [];

  for (let i = start; i < array.length && callback(array[i]) === 0; i++) {
    results.push(array[i]);
  }

  return results;
}