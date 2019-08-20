"use strict";

// Gatsby has very specific sorting requirements. Specifically,
// undefined > null > everything else. So, if an orderby `desc` is
// specified, then nulls and undefined values are of higher rank. This
// is due to the use of lodash's `orderBy` function in
// `run-sift`.
//
// The below functions are alternate versions of the comparators used
// by loki that match lodash's behavior
//
// Note: This is quite hacky and not officially supported by Loki, but
// works quite well.
//
// The below implementation is a direct copy of Loki, except that
// undefined's rank is 11, and null's rank is 10. Whereas in loki,
// they are both of rank 1
function ltHelper(prop1, prop2, equal) {
  var cv1, cv2, t1, t2; // if one of the params is falsy or strictly true or not equal to itself
  // 0, 0.0, "", NaN, null, undefined, not defined, false, true

  if (!prop1 || !prop2 || prop1 === true || prop2 === true || prop1 !== prop1 || prop2 !== prop2) {
    switch (prop1) {
      case undefined:
        t1 = 11;
        break;

      case null:
        t1 = 10;
        break;

      case false:
        t1 = 3;
        break;

      case true:
        t1 = 4;
        break;

      case ``:
        t1 = 5;
        break;
      // if strict equal probably 0 so sort higher, otherwise
      // probably NaN so sort lower than even null

      default:
        t1 = prop1 === prop1 ? 9 : 0;
        break;
    }

    switch (prop2) {
      case undefined:
        t2 = 11;
        break;

      case null:
        t2 = 10;
        break;

      case false:
        t2 = 3;
        break;

      case true:
        t2 = 4;
        break;

      case ``:
        t2 = 5;
        break;

      default:
        t2 = prop2 === prop2 ? 9 : 0;
        break;
    } // one or both is edge case


    if (t1 !== 9 || t2 !== 9) {
      return t1 === t2 ? equal : t1 < t2;
    }
  } // if both are numbers (string encoded or not), compare as numbers


  cv1 = Number(prop1);
  cv2 = Number(prop2);

  if (cv1 === cv1 && cv2 === cv2) {
    if (cv1 < cv2) return true;
    if (cv1 > cv2) return false;
    return equal;
  }

  if (cv1 === cv1 && cv2 !== cv2) {
    return true;
  }

  if (cv2 === cv2 && cv1 !== cv1) {
    return false;
  }

  if (prop1 < prop2) return true;
  if (prop1 > prop2) return false;
  if (prop1 == prop2) return equal; // not strict equal nor less than nor gt so must be mixed types, convert to string and use that to compare

  cv1 = prop1.toString();
  cv2 = prop2.toString();

  if (cv1 < cv2) {
    return true;
  }

  if (cv1 == cv2) {
    return equal;
  }

  return false;
}

function gtHelper(prop1, prop2, equal) {
  var cv1, cv2, t1, t2; // 'falsy' and Boolean handling

  if (!prop1 || !prop2 || prop1 === true || prop2 === true || prop1 !== prop1 || prop2 !== prop2) {
    switch (prop1) {
      case undefined:
        t1 = 11;
        break;

      case null:
        t1 = 10;
        break;

      case false:
        t1 = 3;
        break;

      case true:
        t1 = 4;
        break;

      case ``:
        t1 = 5;
        break;
      // NaN 0

      default:
        t1 = prop1 === prop1 ? 9 : 0;
        break;
    }

    switch (prop2) {
      case undefined:
        t2 = 11;
        break;

      case null:
        t2 = 10;
        break;

      case false:
        t2 = 3;
        break;

      case true:
        t2 = 4;
        break;

      case ``:
        t2 = 5;
        break;

      default:
        t2 = prop2 === prop2 ? 9 : 0;
        break;
    } // one or both is edge case


    if (t1 !== 9 || t2 !== 9) {
      return t1 === t2 ? equal : t1 > t2;
    }
  } // if both are numbers (string encoded or not), compare as numbers


  cv1 = Number(prop1);
  cv2 = Number(prop2);

  if (cv1 === cv1 && cv2 === cv2) {
    if (cv1 > cv2) return true;
    if (cv1 < cv2) return false;
    return equal;
  }

  if (cv1 === cv1 && cv2 !== cv2) {
    return false;
  }

  if (cv2 === cv2 && cv1 !== cv1) {
    return true;
  }

  if (prop1 > prop2) return true;
  if (prop1 < prop2) return false;
  if (prop1 == prop2) return equal; // not strict equal nor less than nor gt so must be dates or mixed types
  // convert to string and use that to compare

  cv1 = prop1.toString();
  cv2 = prop2.toString();

  if (cv1 > cv2) {
    return true;
  }

  if (cv1 == cv2) {
    return equal;
  }

  return false;
}

module.exports = {
  ltHelper,
  gtHelper
};
//# sourceMappingURL=custom-comparators.js.map