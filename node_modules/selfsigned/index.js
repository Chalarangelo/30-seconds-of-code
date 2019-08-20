var forge = require('node-forge');

// a hexString is considered negative if it's most significant bit is 1
// because serial numbers use ones' complement notation
// this RFC in section 4.1.2.2 requires serial numbers to be positive
// http://www.ietf.org/rfc/rfc5280.txt
function toPositiveHex(hexString){
  var mostSiginficativeHexAsInt = parseInt(hexString[0], 16);
  if (mostSiginficativeHexAsInt < 8){
    return hexString;
  }

  mostSiginficativeHexAsInt -= 8;
  return mostSiginficativeHexAsInt.toString() + hexString.substring(1);
}

function getAlgorithm(key) {
  switch (key) {
    case 'sha256':
      return forge.md.sha256.create();
    default:
      return forge.md.sha1.create();
  }
}

exports.generate = function generate(attrs, options, done) {
  if (typeof attrs === 'function') {
    done = attrs;
    attrs = undefined;
  } else if (typeof options === 'function') {
    done = options;
    options = {};
  }

  options = options || {};

  var generatePem = function (keyPair) {
    var cert = forge.pki.createCertificate();

    cert.serialNumber = toPositiveHex(forge.util.bytesToHex(forge.random.getBytesSync(9))); // the serial number can be decimal or hex (if preceded by 0x)

    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + (options.days || 365));

    attrs = attrs || [{
      name: 'commonName',
      value: 'example.org'
    }, {
      name: 'countryName',
      value: 'US'
    }, {
      shortName: 'ST',
      value: 'Virginia'
    }, {
      name: 'localityName',
      value: 'Blacksburg'
    }, {
      name: 'organizationName',
      value: 'Test'
    }, {
      shortName: 'OU',
      value: 'Test'
    }];

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    cert.publicKey = keyPair.publicKey;

    cert.setExtensions(options.extensions || [{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 6, // URI
        value: 'http://example.org/webid#me'
      }]
    }]);

    cert.sign(keyPair.privateKey, getAlgorithm(options && options.algorithm));

    const fingerprint = forge.md.sha1
                          .create()
                          .update(forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes())
                          .digest()
                          .toHex()
                          .match(/.{2}/g)
                          .join(':');

    var pem = {
      private:     forge.pki.privateKeyToPem(keyPair.privateKey),
      public:      forge.pki.publicKeyToPem(keyPair.publicKey),
      cert:        forge.pki.certificateToPem(cert),
      fingerprint: fingerprint,
    };

    if (options && options.pkcs7) {
      var p7 = forge.pkcs7.createSignedData();
      p7.addCertificate(cert);
      pem.pkcs7 = forge.pkcs7.messageToPem(p7);
    }

    if (options && options.clientCertificate) {
      var clientkeys = forge.pki.rsa.generateKeyPair(1024);
      var clientcert = forge.pki.createCertificate();
      clientcert.serialNumber = toPositiveHex(forge.util.bytesToHex(forge.random.getBytesSync(9)));
      clientcert.validity.notBefore = new Date();
      clientcert.validity.notAfter = new Date();
      clientcert.validity.notAfter.setFullYear(clientcert.validity.notBefore.getFullYear() + 1);

      var clientAttrs = JSON.parse(JSON.stringify(attrs));

      for(var i = 0; i < clientAttrs.length; i++) {
        if(clientAttrs[i].name === 'commonName') {
          if( options.clientCertificateCN )
            clientAttrs[i] = { name: 'commonName', value: options.clientCertificateCN };
          else
            clientAttrs[i] = { name: 'commonName', value: 'John Doe jdoe123' };
        }
      }

      clientcert.setSubject(clientAttrs);

      // Set the issuer to the parent key
      clientcert.setIssuer(attrs);

      clientcert.publicKey = clientkeys.publicKey;

      // Sign client cert with root cert
      clientcert.sign(keyPair.privateKey);

      pem.clientprivate = forge.pki.privateKeyToPem(clientkeys.privateKey);
      pem.clientpublic = forge.pki.publicKeyToPem(clientkeys.publicKey);
      pem.clientcert = forge.pki.certificateToPem(clientcert);

      if (options.pkcs7) {
        var clientp7 = forge.pkcs7.createSignedData();
        clientp7.addCertificate(clientcert);
        pem.clientpkcs7 = forge.pkcs7.messageToPem(clientp7);
      }
    }

    var caStore = forge.pki.createCaStore();
    caStore.addCertificate(cert);

    try {
      forge.pki.verifyCertificateChain(caStore, [cert],
        function (vfd, depth, chain) {
          if (vfd !== true) {
            throw new Error('Certificate could not be verified.');
          }
          return true;
        });
    }
    catch(ex) {
      throw new Error(ex);
    }

    return pem;
  };

  var keySize = options.keySize || 1024;

  if (done) { // async scenario
    return forge.pki.rsa.generateKeyPair({ bits: keySize }, function (err, keyPair) {
      if (err) { return done(err); }

      try {
        return done(null, generatePem(keyPair));
      } catch (ex) {
        return done(err);
      }
    });
  }

  var keyPair = options.keyPair ? {
    privateKey: forge.pki.privateKeyFromPem(options.keyPair.privateKey),
    publicKey: forge.pki.publicKeyFromPem(options.keyPair.publicKey)
  } : forge.pki.rsa.generateKeyPair(keySize);

  return generatePem(keyPair);
};
