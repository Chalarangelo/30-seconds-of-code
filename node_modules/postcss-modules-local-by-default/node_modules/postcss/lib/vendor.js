'use strict';

exports.__esModule = true;
/**
 * Contains helpers for working with vendor prefixes.
 *
 * @example
 * const vendor = postcss.vendor;
 *
 * @namespace vendor
 */
var vendor = {

    /**
     * Returns the vendor prefix extracted from an input string.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} vendor prefix or empty string
     *
     * @example
     * postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
     * postcss.vendor.prefix('tab-size')      //=> ''
     */
    prefix: function prefix(prop) {
        var match = prop.match(/^(-\w+-)/);
        if (match) {
            return match[0];
        } else {
            return '';
        }
    },


    /**
     * Returns the input string stripped of its vendor prefix.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} string name without vendor prefixes
     *
     * @example
     * postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
     */
    unprefixed: function unprefixed(prop) {
        return prop.replace(/^-\w+-/, '');
    }
};

exports.default = vendor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlbmRvci5lczYiXSwibmFtZXMiOlsidmVuZG9yIiwicHJlZml4IiwicHJvcCIsIm1hdGNoIiwidW5wcmVmaXhlZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7OztBQVFBLElBQUlBLFNBQVM7O0FBRVQ7Ozs7Ozs7Ozs7O0FBV0FDLFVBYlMsa0JBYUZDLElBYkUsRUFhSTtBQUNULFlBQUlDLFFBQVFELEtBQUtDLEtBQUwsQ0FBVyxVQUFYLENBQVo7QUFDQSxZQUFLQSxLQUFMLEVBQWE7QUFDVCxtQkFBT0EsTUFBTSxDQUFOLENBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTyxFQUFQO0FBQ0g7QUFDSixLQXBCUTs7O0FBc0JUOzs7Ozs7Ozs7O0FBVUFDLGNBaENTLHNCQWdDRUYsSUFoQ0YsRUFnQ1E7QUFDYixlQUFPQSxLQUFLRyxPQUFMLENBQWEsUUFBYixFQUF1QixFQUF2QixDQUFQO0FBQ0g7QUFsQ1EsQ0FBYjs7a0JBc0NlTCxNIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udGFpbnMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIHZlbmRvciBwcmVmaXhlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgdmVuZG9yID0gcG9zdGNzcy52ZW5kb3I7XG4gKlxuICogQG5hbWVzcGFjZSB2ZW5kb3JcbiAqL1xubGV0IHZlbmRvciA9IHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZlbmRvciBwcmVmaXggZXh0cmFjdGVkIGZyb20gYW4gaW5wdXQgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSBzdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXhcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdmVuZG9yIHByZWZpeCBvciBlbXB0eSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCctbW96LXRhYi1zaXplJykgLy89PiAnLW1vei0nXG4gICAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCd0YWItc2l6ZScpICAgICAgLy89PiAnJ1xuICAgICAqL1xuICAgIHByZWZpeChwcm9wKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IHByb3AubWF0Y2goL14oLVxcdystKS8pO1xuICAgICAgICBpZiAoIG1hdGNoICkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGlucHV0IHN0cmluZyBzdHJpcHBlZCBvZiBpdHMgdmVuZG9yIHByZWZpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gc3RyaW5nIHdpdGggb3Igd2l0aG91dCB2ZW5kb3IgcHJlZml4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHN0cmluZyBuYW1lIHdpdGhvdXQgdmVuZG9yIHByZWZpeGVzXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MudmVuZG9yLnVucHJlZml4ZWQoJy1tb3otdGFiLXNpemUnKSAvLz0+ICd0YWItc2l6ZSdcbiAgICAgKi9cbiAgICB1bnByZWZpeGVkKHByb3ApIHtcbiAgICAgICAgcmV0dXJuIHByb3AucmVwbGFjZSgvXi1cXHcrLS8sICcnKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZlbmRvcjtcbiJdfQ==
