'use strict';

exports.type = 'perItem';

exports.active = false;

exports.description = 'sorts element attributes (disabled by default)';

exports.params = {
	order: [
		'id',
		'width', 'height',
		'x', 'x1', 'x2',
		'y', 'y1', 'y2',
		'cx', 'cy', 'r',
		'fill', 'stroke', 'marker',
		'd', 'points'
	]
};

/**
 * Sort element attributes for epic readability.
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 *
 * @author Nikolay Frantsev
 */
exports.fn = function(item, params) {

	var attrs = [],
		sorted = {},
		orderlen = params.order.length + 1,
		xmlnsOrder = params.xmlnsOrder || 'front';

	if (item.elem) {

		item.eachAttr(function(attr) {
			attrs.push(attr);
		});

		attrs.sort(function(a, b) {
			if (a.prefix != b.prefix) {
				// xmlns attributes implicitly have the prefix xmlns
				if (xmlnsOrder == 'front') {
                    if (a.prefix == 'xmlns')
                        return -1;
                    if (b.prefix == 'xmlns')
                        return 1;
                }
				return a.prefix < b.prefix ? -1 : 1;
			}

			var aindex = orderlen;
			var bindex = orderlen;

			for (var i = 0; i < params.order.length; i++) {
				if (a.name == params.order[i]) {
					aindex = i;
				} else if (a.name.indexOf(params.order[i] + '-') === 0) {
					aindex = i + .5;
				}
				if (b.name == params.order[i]) {
					bindex = i;
				} else if (b.name.indexOf(params.order[i] + '-') === 0) {
					bindex = i + .5;
				}
			}

			if (aindex != bindex) {
				return aindex - bindex;
			}
			return a.name < b.name ? -1 : 1;
		});

		attrs.forEach(function (attr) {
			sorted[attr.name] = attr;
		});

		item.attrs = sorted;

	}

};
