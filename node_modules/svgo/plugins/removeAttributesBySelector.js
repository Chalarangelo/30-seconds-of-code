'use strict';

exports.type = 'perItem';

exports.active = false;

exports.description = 'removes attributes of elements that match a css selector';


/**
 * Removes attributes of elements that match a css selector.
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @example
 * <caption>A selector removing a single attribute</caption>
 * plugins:
 *   - removeAttributesBySelector:
 *       selector: "[fill='#00ff00']"
 *       attributes: "fill"
 *
 * <rect x="0" y="0" width="100" height="100" fill="#00ff00" stroke="#00ff00"/>
 *   ↓
 * <rect x="0" y="0" width="100" height="100" stroke="#00ff00"/>     
 *
 * <caption>A selector removing multiple attributes</caption>
 * plugins:
 *   - removeAttributesBySelector:
 *       selector: "[fill='#00ff00']"
 *       attributes:
 *         - fill
 *         - stroke
 *
 * <rect x="0" y="0" width="100" height="100" fill="#00ff00" stroke="#00ff00"/>
 *   ↓
 * <rect x="0" y="0" width="100" height="100"/>     
 *
 * <caption>Multiple selectors removing attributes</caption>
 * plugins:
 *   - removeAttributesBySelector:
 *       selectors:
 *         - selector: "[fill='#00ff00']"
 *           attributes: "fill"
 *
 *         - selector: "#remove"
 *           attributes:
 *             - stroke
 *             - id
 *
 * <rect x="0" y="0" width="100" height="100" fill="#00ff00" stroke="#00ff00"/>
 *   ↓
 * <rect x="0" y="0" width="100" height="100"/>
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|MDN CSS Selectors}
 *
 * @author Bradley Mease
 */
exports.fn = function(item, params) {

    var selectors = Array.isArray(params.selectors) ? params.selectors : [params];

    selectors.map(function(i) {
        if (item.matches(i.selector)) {
            item.removeAttr(i.attributes);
        }
    });

};
