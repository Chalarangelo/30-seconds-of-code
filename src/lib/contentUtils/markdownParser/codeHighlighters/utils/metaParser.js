// Generics (nil check, integer parsing)
const isNil = val => [null, undefined].includes(val);
const parseInteger = str => Number.parseInt(str.trim(), 10);

// Constants: delimiters, pairs, separators
const SINGLE_CHAR_DELIMITERS = [`'`, `"`, '/'];
const QUOTE_DELIMITERS = SINGLE_CHAR_DELIMITERS.slice(0, 2);
const PAIR_DELIMITERS = [{ start: `{`, end: `}` }];
const RANGE_END_DELIMITER = PAIR_DELIMITERS[0].end;
const DELIMITERS = [
  ...SINGLE_CHAR_DELIMITERS,
  ...PAIR_DELIMITERS.map(d => Object.values(d)).flat(),
];
const KEY_VALUE_SEPARATOR = `=`;
const RANGE_KEY_VALUE_SEPARATOR = `:`;

// Delimiter handling (checks, matching, removal)
const isDelimiter = char => DELIMITERS.includes(char);

const delimitersMatch = (opening, closing) => {
  if (SINGLE_CHAR_DELIMITERS.includes(opening) && opening === closing)
    return true;
  return PAIR_DELIMITERS.some(d => d.start === opening && d.end === closing);
};

const isDelimited = str =>
  str.length > 1 && delimitersMatch(str[0], str[str.length - 1]);

const undelimitValue = str => str.slice(1, -1);

// Delimited value checks (range, regexp)
const isRegExp = str => {
  const delimiter = SINGLE_CHAR_DELIMITERS[2];
  return str.startsWith(delimiter) && str.endsWith(delimiter);
};

const isRange = str => {
  const { start, end } = PAIR_DELIMITERS[0];
  return str.startsWith(start) && str.endsWith(end);
};

// Key pair handling (checking, retrieval)
const isKeyLike = segment =>
  segment.length > 1 && segment.endsWith(KEY_VALUE_SEPARATOR);

const isKeyValuePair = segment => segment.includes(KEY_VALUE_SEPARATOR);

const getKey = segment => {
  // Key segments must end with the key-value separator and have a length.
  if (!segment || !segment.trim() || !isKeyLike(segment)) return null;

  return segment.slice(0, -1).trim() || null;
};

// Raw segment handling (backslashes, cleanup)
const escapeBackslashes = (str, openingBracket) => {
  // Find groups of one or more backslashes.
  return str.replace(
    new RegExp(String.raw`(\\+)` + `${openingBracket}?`, 'g'),
    match => {
      const count = match.length;

      // If the match ends with the opening bracket, we need to escape it,
      // unrepeating the remaining backslashes.
      if (match.endsWith(openingBracket))
        return '\\'.repeat(Math.floor((count - 1) / 2)) + openingBracket;

      // Otherwise, we need to escape the backslashes, unrepeating them.
      // If the count is odd, we need to add the last character.
      return '\\'.repeat(Math.floor(count / 2)) + (count % 2) !== 0
        ? match.slice(-1)
        : '';
    }
  );
};

const cleanUpSegments = segments => {
  return (
    segments
      .map(segment => {
        // Keep delimited segments as they are.
        if (isDelimited(segment)) return segment;
        // Split non-delimited segments by spaces.
        return segment.split(' ').map(s => s.trim());
      })
      // Flatten the result.
      .flat()
      // Filter out empty segments.
      .filter(Boolean)
  );
};

// Range value handling (unpacking, parsing values)
const unpackRange = (start, end) => {
  if (start === end || isNil(end)) return [start];
  if (start > end) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const parseRangeValues = str => {
  // Convert the ranges values into an array of integers. Multiple values
  // can be saparated by commas. Each value can be itself a range with
  // a start and end value, separated by a dash.
  return str
    .split(',')
    .map(v => v.split('-'))
    .map(v => unpackRange(...v.map(parseInteger)))
    .flat();
};

const splitRangeKeyValuePair = str => {
  // Ranges may contain an optional name, formatted like `{name:range}`.
  // If the range contains a colon, split it into a name and a range.
  if (!str.includes(RANGE_KEY_VALUE_SEPARATOR)) return [null, str];

  // Use the last index of the separator, as it may be contained in the
  // quoted label itself.
  const lastSeparatorIndex = str.lastIndexOf(RANGE_KEY_VALUE_SEPARATOR);

  let [label, value] = [
    str.slice(0, lastSeparatorIndex).trim(),
    str.slice(lastSeparatorIndex + 1).trim(),
  ];

  if (label[0] === label[label.length - 1]) {
    if (QUOTE_DELIMITERS.includes(label[0])) {
      // If the label is quoted, remove the quotes and remove any escaped
      // backslashes in it.
      label = escapeBackslashes(undelimitValue(label), label[0]);
    }
  }

  return [label || null, value];
};

// Typed segment creation
const rangeToTypedSegment = str => {
  const [label, range] = splitRangeKeyValuePair(str);
  const value = parseRangeValues(range);

  const result = { type: 'range', value };
  // If the range has a label, assign it.
  if (label) result.label = label;

  return result;
};

const regExpToTypedSegment = str => ({
  value: new RegExp(str),
  type: 'regexp',
});
const stringToTypedSegment = str => ({ value: str, type: 'string' });
const booleanToTypedSegment = str => ({
  type: 'boolean',
  key: str.trim(),
  value: true,
});

const delimitedToTypedSegment = (segment, potentialKey) => {
  // Undelimit the value of the delimited segment.
  const value = undelimitValue(segment);
  // If the previous segment is a key, we can assign it.
  const key = getKey(potentialKey);
  let parsed;

  if (isRange(segment)) parsed = rangeToTypedSegment(value);
  else if (isRegExp(segment)) parsed = regExpToTypedSegment(value);
  else parsed = stringToTypedSegment(value);

  return { key, ...parsed };
};

const undelimitedKeyValuePairToTypedSegment = segment => {
  // If there is a key-value separator, split the segment into key and value.
  // If either one is missing, return an empty segment.
  const [key, value] = segment.split(KEY_VALUE_SEPARATOR).map(s => s.trim());
  if (!key || !value) return { key: null, value: null, type: null };

  // Handle boolean strings (ignoring case).
  if (value.toLowerCase() === 'true')
    return { key, value: true, type: 'boolean' };
  if (value.toLowerCase() === 'false')
    return { key, value: false, type: 'boolean' };

  // If not a boolean, handle as a string.
  return { key, value, type: 'string' };
};

// Segment termination checks (range labels, escape sequences)
const isDelimiterEscaped = buffer => {
  // Calculate escape count at the end of the buffer. If it's even, then
  // the delimiter is unescaped and we can flush the segment.
  const matches = buffer.match(/\\+$/);
  const escapeCount = matches ? matches[0].length : 0;

  return escapeCount % 2 !== 0;
};

const isInsideRangeLabel = (buffer, char, openingBracket) => {
  if (char !== RANGE_END_DELIMITER) return false;
  // Check if there's an opening quote in the buffer.
  const openingQuotation = buffer.match(
    new RegExp(
      '^' + openingBracket + '\\s*(' + QUOTE_DELIMITERS.join('|') + ')'
    )
  );
  if (!openingQuotation) return false;

  // If there is, we need to check if the closing quote is also in the buffer.
  const openingQuote = openingQuotation[1];
  const openingIndex = buffer.indexOf(openingQuote);
  const closingIndex = buffer.lastIndexOf(openingQuote);
  if (openingIndex === closingIndex) return true;

  // If there is a closing quote, check it doesn't follow an escape sequence.
  return isDelimiterEscaped(buffer.slice(openingIndex, closingIndex));
};

// Segmentation (produces raw segments) & processing (produces typed segments)
const toTypedSegments = segments => {
  let typedSegments = [];

  segments.forEach((segment, i) => {
    // If the segment is a potential key, skip it; it will be processed later.
    if (isKeyLike(segment)) return;

    // key: optional, value: required
    // type: string, regexp, range, boolean
    // label: only for ranges
    let typedSegment;

    if (isDelimited(segment)) {
      // Delimited values may be part of a key-value pair, so we need to check
      // if the previous segment is a key. They may be ranges, regexps, or strings.
      typedSegment = delimitedToTypedSegment(segment, segments[i - 1]);
    } else if (isKeyValuePair(segment)) {
      // Non-delimited values can be key-value pairs themselves, and we need to
      // handle them as such, if they are.
      typedSegment = undelimitedKeyValuePairToTypedSegment(segment);
    } else {
      // Leftover values are treated as booleans
      typedSegment = booleanToTypedSegment(segment);
    }

    if (!isNil(typedSegment?.value)) typedSegments.push(typedSegment);
  });

  return typedSegments;
};

const toSegments = str => {
  let segments = [];
  let buffer = '';
  let openingBracket = null;

  const clearBuffer = () => {
    buffer = '';
    openingBracket = null;
  };

  const input = str.trim();

  // Segment the input string by delimiters.
  for (let char of input) {
    if (isDelimiter(char)) {
      if (delimitersMatch(openingBracket, char)) {
        if (isInsideRangeLabel(buffer, char, openingBracket)) {
          // If it's a range delimiter, we need to check if we're inside a label
          // or not. If we are, we add the character and continue.
          buffer += char;
        } else if (isDelimiterEscaped(buffer)) {
          // Check if the delimiter is escaped. If it is, add it to the buffer
          // and continue.
          buffer += char;
        } else {
          // Delimiter is unescaped and not inside a range label. Make sure to
          // escape any escape sequences in the buffer, before flusing.
          segments.push(escapeBackslashes(buffer + char, openingBracket));
          clearBuffer();
        }
      } else {
        // Delimiters do not match.
        if (buffer.length > 0 && !openingBracket) {
          // There is no opening bracket, therefore flush the buffer.
          segments.push(buffer);
          clearBuffer();
        }
        // Add the current character to the buffer (it may have some contents).
        buffer += char;
        // If the opening bracket is null, assign it to the current character.
        openingBracket ??= char;
      }
    } else {
      // Not a delimiter, add to buffer.
      buffer += char;
    }
  }
  // Flush any remaining buffer.
  if (buffer) segments.push(buffer);

  return cleanUpSegments(segments);
};

// Meta parsing
export const parseMeta = str => {
  // Split the string into segments.
  const segments = toSegments(str);
  // Process the segments into typed segments.
  const typedSegments = toTypedSegments(segments);
  return typedSegments;
};

// Parsed meta retrieval
export const getMetaByKey = (meta, key) => {
  const result = meta.find(item => item.key === key);
  return result ?? null;
};

export const getMetaString = (meta, key) => {
  const result = meta.find(item => item.key === key && item.type === 'string');
  return result ?? null;
};

export const getMetaRanges = (meta, key) => {
  const ranges = meta.filter(item => item.key === key && item.type === 'range');
  return ranges.reduce(
    (acc, item) => {
      const { label, value } = item;
      const labelObject = label ?? null;

      if (!acc.labels.has(labelObject)) acc.labels.set(labelObject, []);
      acc.labels.get(labelObject).push(...value);

      value.forEach(v => {
        acc.lines.set(v, labelObject);
      });

      return acc;
    },
    { lines: new Map(), labels: new Map() }
  );
};

export const getMetaRangeBoundaries = (meta, key) => {
  const ranges = meta.filter(item => item.key === key && item.type === 'range');
  return ranges.reduce((acc, item) => {
    const { value } = item;

    if (value.length === 0) return acc;
    const sorted = value.sort((a, b) => a - b);

    let currentStart = sorted[0];

    for (let i = 0; i < sorted.length - 1; i++)
      if (sorted[i] + 1 !== sorted[i + 1]) {
        acc.push({ start: currentStart, end: sorted[i] });
        currentStart = sorted[i + 1];
      }

    if (currentStart !== sorted[sorted.length - 1])
      acc.push({ start: currentStart, end: sorted[sorted.length - 1] });

    return acc;
  }, []);
};
