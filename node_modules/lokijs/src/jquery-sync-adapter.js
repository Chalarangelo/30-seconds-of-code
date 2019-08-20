/**
 * LokiJS JquerySyncAdapter
 * @author Joe Minichino <joe.minichino@gmail.com>
 *
 * A remote sync adapter example for LokiJS
 */

/*jslint browser: true, node: true, plusplus: true, indent: 2 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.lokiJquerySyncAdapter = factory();
  }
}(this, function () {

  return (function (options) {
    'use strict';

    function JquerySyncAdapterError(message) {
      this.name = "JquerySyncAdapterError";
      this.message = (message || "");
    }

    JquerySyncAdapterError.prototype = Error.prototype;

    /**
     * this adapter assumes an object options is passed,
     * containing the following properties:
     * ajaxLib: jquery or compatible ajax library
     * save: { url: the url to save to, dataType [optional]: json|xml|etc., type [optional]: POST|GET|PUT}
     * load: { url: the url to load from, dataType [optional]: json|xml| etc., type [optional]: POST|GET|PUT }
     */

    function JquerySyncAdapter(options) {
      this.options = options;
      
      if (!options) {
        throw new JquerySyncAdapterError('No options configured in JquerySyncAdapter');
      }

      if (!options.ajaxLib) {
        throw new JquerySyncAdapterError('No ajaxLib property specified in options');
      }

      if (!options.save || !options.load) {
        throw new JquerySyncAdapterError('Please specify load and save properties in options');
      }
      if (!options.save.url || !options.load.url) {
        throw new JquerySyncAdapterError('load and save objects must have url property');
      }
    }

    JquerySyncAdapter.prototype.saveDatabase = function (name, data, callback) {
      this.options.ajaxLib.ajax({
        type: this.options.save.type || 'POST',
        url: this.options.save.url,
        data: data,
        success: callback,
        failure: function () {
          throw new JquerySyncAdapterError("Remote sync failed");
        },
        dataType: this.options.save.dataType || 'json'
      });
    };

    JquerySyncAdapter.prototype.loadDatabase = function (name, callback) {
      this.options.ajaxLib.ajax({
        type: this.options.load.type || 'GET',
        url: this.options.load.url,
        data: {
          // or whatever parameter to fetch the db from a server
          name: name
        },
        success: callback,
        failure: function () {
          throw new JquerySyncAdapterError("Remote load failed");
        },
        dataType: this.options.load.dataType || 'json'
      });
    };

    return JquerySyncAdapter;

  }());
}));