// Generics (nil check, integer parsing)
const isNil = val => [null, undefined].includes(val);
const parseInteger = str => Number.parseInt(str.trim(), 10);

// Constants: delimiters, pairs, separators
const SINGLE_CHAR_DELIMITERS = [`'`, `"`, '/'];
const PAIR_DELIMITERS = [{ start: `{`, end: `}` }];
const DELIMITERS = [
  ...SINGLE_CHAR_DELIMITERS,
  ...PAIR_DELIMITERS.map(d => Object.values(d)).flat(),
];
const KEY_VALUE_SEPARATOR = `=`;

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

// Typed segment creation
const rangeToTypedSegment = str => {
  let description, value;
  // Ranges may contain an optional name, formatted like `{name:range}`.
  // If the range contains a colon, split it into a name and a range.
  if (str.includes(':'))
    [description, value] = str.split(':').map(v => v.trim());
  else value = str;

  value = parseRangeValues(value);

  const result = { type: 'range', value };
  // If the range has a description, assign it.
  if (description) result.description = description;

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

// Segmentation (produces raw segments) & processing (produces typed segments)
const toTypedSegments = segments => {
  let typedSegments = [];

  for (let segment of segments) {
    // If the segment is a potential key, skip it; it will be processed later.
    if (isKeyLike(segment)) continue;

    // key: optional, value: required
    // type: string, regexp, range, boolean
    // description: only for ranges
    let typedSegment;

    if (isDelimited(segment)) {
      // Delimited values may be part of a key-value pair, so we need to check
      // if the previous segment is a key. They may be ranges, regexps, or strings.
      typedSegment = delimitedToTypedSegment(
        segment,
        segments[segments.indexOf(segment) - 1]
      );
    } else if (isKeyValuePair(segment)) {
      // Non-delimited values can be key-value pairs themselves, and we need to
      // handle them as such, if they are.
      typedSegment = undelimitedKeyValuePairToTypedSegment(segment);
    } else {
      // Leftover values are treated as booleans
      typedSegment = booleanToTypedSegment(segment);
    }

    if (!isNil(typedSegment?.value)) typedSegments.push(typedSegment);
  }

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
        // Calculate escape count at the end of the buffer. If it's even, then
        // the delimiter is unescaped and we can flush the segment.
        const matches = buffer.match(/\\+$/);
        const escapeCount = matches ? matches[0].length : 0;

        if (escapeCount % 2 === 0) {
          // Delimiter is unescaped. Make sure to escape any escape sequences
          // in the buffer, before flusing.
          segments.push(escapeBackslashes(buffer + char, openingBracket));
          clearBuffer();
        } else {
          // Delimiter is escaped, add to buffer.
          buffer += char;
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

const parseMeta = str => {
  // Split the string into segments.
  const segments = toSegments(str);
  // Process the segments into typed segments.
  const typedSegments = toTypedSegments(segments);
  return typedSegments;
};

export default parseMeta;
