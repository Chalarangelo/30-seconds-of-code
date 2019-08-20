 /**
 * LokiNativescriptAdapter
 * @author Stefano Falda <stefano.falda@gmail.com>
 *
 * Lokijs adapter for nativescript framework (http://www.nativescript.org)
 *
 * The db file is created in the app documents folder. 
 
 * How to use:
 * Just create a new loki db and your ready to go: 
 * 
 * let db = new loki('loki.json',{autosave:true});
 * 
 */

function LokiNativescriptAdapter() {
      this.fs = require("file-system");
  }
  
LokiNativescriptAdapter.prototype.loadDatabase = function(dbname, callback){
    var documents = this.fs.knownFolders.documents();
    var myFile = documents.getFile(dbname);    
    //Read from filesystem
    myFile.readText()
            .then(function (content) {
                //The file is empty or missing
                if (content===""){
                    callback(new Error("DB file does not exist"));
                } else {
                    callback(content);    
                }
            }, function (error) {
                console.log("Error opening db "+dbname+": "+ error);
                 callback(new Error(error));
            });
};

LokiNativescriptAdapter.prototype.saveDatabase = function(dbname, serialized, callback){
    var documents = this.fs.knownFolders.documents();
    var myFile = documents.getFile(dbname);    
    myFile.writeText(serialized)
            .then(function () {
                callback();
            }, function (error) {
                console.log("Error saving db "+dbname+": "+ error);
            });
    
};

LokiNativescriptAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
      var documents = this.fs.knownFolders.documents();
      var file = documents.getFile(dbname);
      file.remove()
            .then(function (result) {
            callback();
            }, function (error) {
                callback(error);
            });
    };
    
module.exports = LokiNativescriptAdapter;