var zero = '0'.charCodeAt(0);
var plus = '+'.charCodeAt(0);
var minus = '-'.charCodeAt(0);

function isWhitespace(code) {
	return code <= 32;
}

function isDigit(code) {
	return 48 <= code && code <= 57;
}

function isSign(code) {
	return code === minus || code === plus;
}

module.exports = function (opts, a, b) {
	var checkSign = opts.sign;
	var ia = 0;
	var ib = 0;
	var ma = a.length;
	var mb = b.length;
	var ca, cb; // character code
	var za, zb; // leading zero count
	var na, nb; // number length
	var sa, sb; // number sign
	var ta, tb; // temporary
	var bias;

	while (ia < ma && ib < mb) {
		ca = a.charCodeAt(ia);
		cb = b.charCodeAt(ib);
		za = zb = 0;
		na = nb = 0;
		sa = sb = true;
		bias = 0;

		// skip over leading spaces
		while (isWhitespace(ca)) {
			ia += 1;
			ca = a.charCodeAt(ia);
		}
		while (isWhitespace(cb)) {
			ib += 1;
			cb = b.charCodeAt(ib);
		}

		// skip and save sign
		if (checkSign) {
			ta = a.charCodeAt(ia + 1);
			if (isSign(ca) && isDigit(ta)) {
				if (ca === minus) {
					sa = false;
				}
				ia += 1;
				ca = ta;
			}
			tb = b.charCodeAt(ib + 1);
			if (isSign(cb) && isDigit(tb)) {
				if (cb === minus) {
					sb = false;
				}
				ib += 1;
				cb = tb;
			}
		}

		// compare digits with other symbols
		if (isDigit(ca) && !isDigit(cb)) {
			return -1;
		}
		if (!isDigit(ca) && isDigit(cb)) {
			return 1;
		}

		// compare negative and positive
		if (!sa && sb) {
			return -1;
		}
		if (sa && !sb) {
			return 1;
		}

		// count leading zeros
		while (ca === zero) {
			za += 1;
			ia += 1;
			ca = a.charCodeAt(ia);
		}
		while (cb === zero) {
			zb += 1;
			ib += 1;
			cb = b.charCodeAt(ib);
		}

		// count numbers
		while (isDigit(ca) || isDigit(cb)) {
			if (isDigit(ca) && isDigit(cb) && bias === 0) {
				if (sa) {
					if (ca < cb) {
						bias = -1;
					} else if (ca > cb) {
						bias = 1;
					}
				} else {
					if (ca > cb) {
						bias = -1;
					} else if (ca < cb) {
						bias = 1;
					}
				}
			}
			if (isDigit(ca)) {
				ia += 1;
				na += 1;
				ca = a.charCodeAt(ia);
			}
			if (isDigit(cb)) {
				ib += 1;
				nb += 1;
				cb = b.charCodeAt(ib);
			}
		}

		// compare number length
		if (sa) {
			if (na < nb) {
				return -1;
			}
			if (na > nb) {
				return 1;
			}
		} else {
			if (na > nb) {
				return -1;
			}
			if (na < nb) {
				return 1;
			}
		}

		// compare numbers
		if (bias) {
			return bias;
		}

		// compare leading zeros
		if (sa) {
			if (za > zb) {
				return -1;
			}
			if (za < zb) {
				return 1;
			}
		} else {
			if (za < zb) {
				return -1;
			}
			if (za > zb) {
				return 1;
			}
		}

		// compare ascii codes
		if (ca < cb) {
			return -1;
		}
		if (ca > cb) {
			return 1;
		}

		ia += 1;
		ib += 1;
	}

	// compare length
	if (ma < mb) {
		return -1;
	}
	if (ma > mb) {
		return 1;
	}
};
