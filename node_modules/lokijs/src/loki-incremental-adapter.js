(function (root, factory) {

  module.exports = factory();

}(this, function () {
  return (function () {

    const fs = require('fs');

    const accessDataDir = (datadir) => {
      return new Promise((resolve, reject) => {
        fs.lstat(datadir, (err, stats) => {
          if (err) {
            reject({
              message: 'Dir does not exist'
            });
          }
          resolve(stats);
        });
      });
    };

    const saveRecord = (coll, obj, dir) => {
      console.log(`File is ${dir}/${coll}/${obj.$loki}.json`);
      fs.writeFile(`${dir}/${coll}/${obj.$loki}.json`, JSON.stringify(obj), {
        encoding: 'utf8'
      }, (err) => {
        if (err) {
          console.log('Document save failed.');
          throw err;
        }
        console.log('Document saved correctly');
      });
    };

    const iterateFolders = (db, dir) => {
      console.log(`Colls: ${db.listCollections().length}`);

      console.log(`Changes: ${db.generateChangesNotification().length}`);
      db.generateChangesNotification().forEach(change => {
        saveRecord(change.name, change.obj, dir);
      });
    };

    class LokiIncrementalAdapter {
      constructor(options) {
        const config = options || {
          journaling: false,
          format: 'json'
        };
        this.mode = 'reference';
        this.journaling = config.journaling;
        this.format = config.format;
      }

      checkAvailability() {
        if (typeof fs !== 'undefined' && fs) return true;
        return false;
      }

      exportDatabase(dir, dbref, callback) {
        console.log('Saving with incremental adapter');

        console.log('Database dir is ' + dir);
        const promise = accessDataDir(dir);
        console.log(promise);
        promise.then(() => {
          console.log('iterating folders...');
          iterateFolders(dbref, dir);
        });
        promise.catch((err) => {
          console.log(err);
        });
        if (callback) {
          callback();
        }
      }

      loadDatabase(dbname, callback) {
        console.log(this, dbname, callback);
      }
    }

    return LokiIncrementalAdapter;

  }());
}));
