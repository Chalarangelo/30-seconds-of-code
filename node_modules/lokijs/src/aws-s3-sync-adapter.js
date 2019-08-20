/**
 * LokiJS AWSS3SyncAdapter
 * @author Simon Hutchison <https://github.com/hutch120>
 *
 * A remote sync adapter for LokiJS to AWS S3
 *
 * Basic usage:
 *
   const AWS = require('aws-sdk')
   const Loki = require('lokijs')
   const AWSS3SyncAdapter = require('./aws-s3-sync-adapter.js')
   var db

   var _init = function () {
     const options = {
       'AWS': AWS,
       'accessKeyId': process.env.accessKeyId, // Avoid hardcoding credentials
       'secretAccessKey': process.env.secretAccessKey, // Avoid hardcoding credentials
       'bucket': '...'
     }
     const adapter = new AWSS3SyncAdapter(options);
     db = new Loki('somefile.json', {
       autoload: false,
       autosave: true,
       adapter: adapter
     })
   }

   var _save = function () {
     db.saveDatabase(function (err, data) {
       if (err) {
         console.log(err)
         process.exit()
       } else {
         console.log('DB saved to AWS S3')
         _load() // Now attempt to load it back.
       }
     })
   }

   var _load = function () {
     db.loadDatabase({}, function (err) {
       if (err) {
         console.log(err)
         process.exit()
       } else {
         console.log('DB loaded from AWS S3')
         process.exit()
       }
     })
   }

   _init()
   _save()
 *
 */

/* eslint */
/* global define */

/* jslint browser: true, node: true, plusplus: true, indent: 2 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.lokiAWSS3SyncAdapter = factory();
  }
}(this, function () {
  return (function (options) {
    'use strict';

    function AWSS3SyncAdapterError (message) {
      this.name = 'AWSS3SyncAdapterError';
      this.message = (message || '');
    }

    AWSS3SyncAdapterError.prototype = Error.prototype;

    /**
     * This adapter requires an object options is passed containing the following properties:
     *  AWS: Reference to the AWS SDK.
     *  accessKeyId: AWS access key ID
     *  secretAccessKey: AWS secret access key
     *  bucket: A global aws bucket name
     */

    function AWSS3SyncAdapter (options) {
      this.options = options;

      if (!options) {
        throw new AWSS3SyncAdapterError('No options configured in AWSS3SyncAdapter');
      }

      if (!options.AWS) {
        throw new AWSS3SyncAdapterError('No AWS library specified in options');
      }

      if (!options.accessKeyId) {
        throw new AWSS3SyncAdapterError('No accessKeyId property specified in options');
      }

      if (!options.secretAccessKey) {
        throw new AWSS3SyncAdapterError('No secretAccessKey property specified in options');
      }

      if (!options.bucket) {
        throw new AWSS3SyncAdapterError('No bucket property specified in options');
      }

      this.options.AWS.config.update({accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey});
    }

    AWSS3SyncAdapter.prototype.saveDatabase = function (name, data, callback) {
      console.log('AWSS3SyncAdapter.prototype.saveDatabase():', name);

      const s3 = new this.options.AWS.S3();
      const base64str = Buffer.from(data).toString('base64');

      var params = {
        Body: base64str,
        Bucket: this.options.bucket,
        Key: name,
        ServerSideEncryption: 'AES256',
        Tagging: '' // key1=value1&key2=value2
      };

      s3.putObject(params, function (err, data) {
        if (err) {
          console.log('AWSS3SyncAdapter.prototype.saveDatabase() Error:', err, err.stack);
          throw new AWSS3SyncAdapterError('Remote sync failed');
        } else {
          return callback(null, data);
        }
      });
    };

    AWSS3SyncAdapter.prototype.loadDatabase = function (name, callback) {
      console.log('AWSS3SyncAdapter.prototype.loadDatabase():', name);
      const s3 = new this.options.AWS.S3();

      var params = {
        Bucket: this.options.bucket,
        Key: name
      };

      s3.getObject(params, function (err, data) {
        if (err) {
          console.log('AWSS3SyncAdapter.prototype.loadDatabase() Error:', err, err.stack);
          throw new AWSS3SyncAdapterError('Remote load failed');
        } else {
          if (!data.Body) {
            throw new AWSS3SyncAdapterError('Remote load failed, no data found');
          }
          try {
            var base64data = data.Body.toString();
            var asciiData = Buffer.from(base64data, 'base64').toString();
            var lokiDBObj = JSON.parse(asciiData); // For json objects
            console.log('AWSS3SyncAdapter.prototype.loadDatabase() asciiData:', lokiDBObj);
            return callback(lokiDBObj);
          } catch (e) {
            throw new AWSS3SyncAdapterError('Remote load failed, invalid loki database');
          }
        }
      });
    };

    return AWSS3SyncAdapter;
  }());
}));
