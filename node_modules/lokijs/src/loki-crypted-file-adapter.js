/**
 * @file lokiCryptedFileAdapter.js 
 * @author Hans Klunder <Hans.Klunder@bigfoot.com>
 */
 
 /*
 * The default Loki File adapter uses plain text JSON files. This adapter crypts the database string and wraps the result
 * in a JSON including enough info to be able to decrypt it (except for the 'secret' of course !)
 *
 * The idea is that the 'secret' does not reside in your source code but is supplied by some other source (e.g. the user in node-webkit)
 *
 * The idea + encrypt/decrypt routines are borrowed from  https://github.com/mmoulton/krypt/blob/develop/lib/krypt.js
 * not using the krypt module to avoid third party dependencies
 */


/**
 * require libs
 * @ignore 
*/
var fs = require('fs');
var cryptoLib = require('crypto');
var isError = require('util').isError;

/*
 * sensible defaults
 */
var CIPHER = 'aes-256-cbc',
  KEY_DERIVATION = 'pbkdf2',
  KEY_LENGTH = 256,
  ITERATIONS = 64000;

/**
 * encrypt() - encrypt a string
 * @private
 * @param {string} input - the serialized JSON object to decrypt.
 * @param {string} secret - the secret to use for encryption
 */
function encrypt(input, secret) {
  if (!secret) {
    return new Error('A \'secret\' is required to encrypt');
  }


  var salt = cryptoLib.randomBytes(KEY_LENGTH / 8),
    iv = cryptoLib.randomBytes(16);

  try {

    var key = cryptoLib.pbkdf2Sync(secret, salt, ITERATIONS, KEY_LENGTH / 8, 'sha1'),
      cipher = cryptoLib.createCipheriv(CIPHER, key, iv);

    var encryptedValue = cipher.update(input, 'utf8', 'base64');
    encryptedValue += cipher.final('base64');

    var result = {
      cipher: CIPHER,
      keyDerivation: KEY_DERIVATION,
      keyLength: KEY_LENGTH,
      iterations: ITERATIONS,
      iv: iv.toString('base64'),
      salt: salt.toString('base64'),
      value: encryptedValue
    };
    return result;

  } catch (err) {
    return new Error('Unable to encrypt value due to: ' + err);
  }
}

/**
 * decrypt() - Decrypt a serialized JSON object
 * @private
 * @param {string} input - the serialized JSON object to decrypt.
 * @param {string} secret - the secret to use for decryption
 */
function decrypt(input, secret) {
  // Ensure we have something to decrypt
  if (!input) {
    return new Error('You must provide a value to decrypt');
  }
  // Ensure we have the secret used to encrypt this value
  if (!secret) {
    return new Error('A \'secret\' is required to decrypt');
  }

  // turn string into an object
  try {
      input = JSON.parse(input);
  } catch (err) {
      return new Error('Unable to parse string input as JSON');
  }

  // Ensure our input is a valid object with 'iv', 'salt', and 'value'
  if (!input.iv || !input.salt || !input.value) {
    return new Error('Input must be a valid object with \'iv\', \'salt\', and \'value\' properties');
  }

  var salt = new Buffer(input.salt, 'base64'),
    iv = new Buffer(input.iv, 'base64'),
    keyLength = input.keyLength,
   iterations = input.iterations;

  try {

    var key = cryptoLib.pbkdf2Sync(secret, salt, iterations, keyLength / 8, 'sha1'),
      decipher = cryptoLib.createDecipheriv(CIPHER, key, iv);

    var decryptedValue = decipher.update(input.value, 'base64', 'utf8');
    decryptedValue += decipher.final('utf8');

    return decryptedValue;

  } catch (err) {
    return new Error('Unable to decrypt value due to: ' + err);
  }
}

/**
 * The constructor is automatically called on `require` , see examples below
 * @constructor
 */
function lokiCryptedFileAdapter() {}

/**
 * setSecret() - set the secret to be used during encryption and decryption
 *
 * @param {string} secret - the secret to be used
 */
lokiCryptedFileAdapter.prototype.setSecret = function setSecret(secret) {
  this.secret = secret;
};

/**
 * loadDatabase() - Retrieves a serialized db string from the catalog.
 * 
 *  @example
  // LOAD
    var cryptedFileAdapter = require('./lokiCryptedFileAdapter');
	cryptedFileAdapter.setSecret('mySecret'); // you should change 'mySecret' to something supplied by the user
    var db = new loki('test.crypted', { adapter: cryptedFileAdapter }); //you can use any name, not just '*.crypted'
    db.loadDatabase(function(result) {
		console.log('done');
	});
 *
 * @param {string} dbname - the name of the database to retrieve.
 * @param {function} callback - callback should accept string param containing serialized db string.
 */
lokiCryptedFileAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
  var secret = this.secret;
  var cFun = callback || console.log;
  
  fs.readFile(dbname,'utf8',function(err,data){
    var decrypted = err || decrypt(data, secret);
    cFun(decrypted);
  });
};

/**
 *
 @example
  // SAVE : will save database in 'test.crypted'
	var cryptedFileAdapter = require('./lokiCryptedFileAdapter');
	cryptedFileAdapter.setSecret('mySecret'); // you should change 'mySecret' to something supplied by the user
	var loki=require('lokijs');
	var db = new loki('test.crypted',{ adapter: cryptedFileAdapter }); //you can use any name, not just '*.crypted'
	var coll = db.addCollection('testColl');
	coll.insert({test: 'val'});
	db.saveDatabase();  // could pass callback if needed for async complete
	
	 @example
  // if you have the krypt module installed you can use:
	krypt --decrypt test.crypted --secret mySecret
  to view the contents of the database
	
 * saveDatabase() - Saves a serialized db to the catalog.
 *
 * @param {string} dbname - the name to give the serialized database within the catalog.
 * @param {string} dbstring - the serialized db string to save.
 * @param {function} callback - (Optional) callback passed obj.success with true or false
 */
lokiCryptedFileAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
  var cFun = callback || function (){};
  var encrypted = encrypt(dbstring, this.secret);
  if (! isError(encrypted)){
    fs.writeFile(dbname,
      JSON.stringify(encrypted, null, '  '),
      'utf8',cFun);
  }
  else { // Error !
    cFun(encrypted);
  }
};

module.exports = new lokiCryptedFileAdapter();
exports.lokiCryptedFileAdapter = lokiCryptedFileAdapter;
