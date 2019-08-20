Generate a self signed x509 certificate from node.js.

[![Build Status](https://travis-ci.org/jfromaniello/selfsigned.png)](https://travis-ci.org/jfromaniello/selfsigned)

## Install

```bash
  npm install selfsigned
```

## Usage

```js
var selfsigned = require('selfsigned');
var attrs = [{ name: 'commonName', value: 'contoso.com' }];
var pems = selfsigned.generate(attrs, { days: 365 });
console.log(pems)
```

#### Async

```js
selfsigned.generate(attrs, { days: 365 }, function (err, pems) {
  console.log(pems)
});
```

Will return the following like this:

```js
{
  private: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCBFMXMYS/+RZz6+qzv+xeqXPdjw4YKZC4y3dPhSwgEwkecrCTX\r\nsR6boue+1MjIqPqWggXZnotIGldfEN0kn0Jbh2vMTrTx6YwqQ8tceBPoyuuqcYBO\r\nOONAcKOB3MLnZbyOgVtbyT3j68JE5V/lx6LhpIKAgY0m5WIuaKrW6mvLXQIDAQAB\r\nAoGAU6ODGxAqSecPdayyG/ml9vSwNAuAMgGB0eHcpZG5i2PbhRAh+0TAIXaoFQXJ\r\naAPeA2ISqlTJyRmQXYAO2uj61FzeyDzYCf0z3+yZEVz3cO7jB5Pl6iBvzbxWuuuA\r\ncbJtWLhWtW5/jioc8F0EAzZ+lkC/XuVJdwKHDmwt2qvJO+ECQQD+dvo1g3Sz9xGw\r\n21n+fDG5i4128+Qh+JPgh5AeLuXSofc1HMHaOXcC6Wu/Cloh7QAD934b7W0A7VoD\r\ndLd/JLyFAkEAgdwjryyvdhy69e516IrPB3b+m4rggtntBlZREMrk9tOzeIucVO3W\r\ntKI3FHm6JebN2gVcG+rZ+FaDPo+ifJkW+QJBAPojrMwEACmUevB2f9246gxx0UsY\r\nbq6yM3No71OsWEEY8/Bi53CEQqg7Gq5+F6H33qcHmBEN8LQTngN9rY+vZh0CQBg0\r\nqJImii5B/LeK03+dICoMDDmCEYdSh9P+ku3GZBd+Lp3xqBpMmxDgi9PNPN2DwCs7\r\nhIfPpwGbXqtyqp7/CkECQB4OdY+2FbCciI473eQkTu310RMf8jElU63iwnx4R/XN\r\n/mgqN589OfF4SS0U/MoRzYk9jF9IAJN1Mi/571T+nw4=\r\n-----END RSA PRIVATE KEY-----\r\n',
  public: '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBFMXMYS/+RZz6+qzv+xeqXPdj\r\nw4YKZC4y3dPhSwgEwkecrCTXsR6boue+1MjIqPqWggXZnotIGldfEN0kn0Jbh2vM\r\nTrTx6YwqQ8tceBPoyuuqcYBOOONAcKOB3MLnZbyOgVtbyT3j68JE5V/lx6LhpIKA\r\ngY0m5WIuaKrW6mvLXQIDAQAB\r\n-----END PUBLIC KEY-----\r\n',
  cert: '-----BEGIN CERTIFICATE-----\r\nMIICjTCCAfagAwIBAgIBATANBgkqhkiG9w0BAQUFADBpMRQwEgYDVQQDEwtleGFt\r\ncGxlLm9yZzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQH\r\nEwpCbGFja3NidXJnMQ0wCwYDVQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MB4XDTEz\r\nMDgxMzA1NDAyN1oXDTE0MDgxMzA1NDAyN1owaTEUMBIGA1UEAxMLZXhhbXBsZS5v\r\ncmcxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxh\r\nY2tzYnVyZzENMAsGA1UEChMEVGVzdDENMAsGA1UECxMEVGVzdDCBnzANBgkqhkiG\r\n9w0BAQEFAAOBjQAwgYkCgYEAgRTFzGEv/kWc+vqs7/sXqlz3Y8OGCmQuMt3T4UsI\r\nBMJHnKwk17Eem6LnvtTIyKj6loIF2Z6LSBpXXxDdJJ9CW4drzE608emMKkPLXHgT\r\n6MrrqnGATjjjQHCjgdzC52W8joFbW8k94+vCROVf5cei4aSCgIGNJuViLmiq1upr\r\ny10CAwEAAaNFMEMwDAYDVR0TBAUwAwEB/zALBgNVHQ8EBAMCAvQwJgYDVR0RBB8w\r\nHYYbaHR0cDovL2V4YW1wbGUub3JnL3dlYmlkI21lMA0GCSqGSIb3DQEBBQUAA4GB\r\nAC9hGQlDh8anNo1YDJdG2mYqOQ5uybJV++kixblGaOkoDROPsWepUpL6kMDUtbAM\r\n4uXTyFkvlUQSaQkhNgOY5w/BRIAkCIu6u4D4XcjlCdwFq6vcKMEuWTHMAlBWFla3\r\nXJZAPO10PHuDen7JeMOUf1Re7lRFtwfRGAvVYmrvYFKv\r\n-----END CERTIFICATE-----\r\n'
}
```

## Attributes

for attributes, please refer to: https://github.com/digitalbazaar/forge/blob/0.7.5/lib/x509.js#L129

## Options

```js
var pems = selfsigned.generate(null, {
  keySize: 2048, // the size for the private key in bits (default: 1024)
  days: 30, // how long till expiry of the signed certificate (default: 365)
  algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
  extensions: [{ name: 'basicConstraints', cA: true }], // certificate extensions array
  pkcs7: true, // include PKCS#7 as part of the output (default: false)
  clientCertificate: true, // generate client cert signed by the original key (default: false)
  clientCertificateCN: 'jdoe' // client certificate's common name (default: 'John Doe jdoe123')
});
```

> You can avoid key pair generation specifying your own keys (`{ keyPair: { publicKey: '-----BEGIN PUBLIC KEY-----...', privateKey: '-----BEGIN RSA PRIVATE KEY-----...' }`)

### Generate Client Certificates

If you are in an environment where servers require client certificates, you can generate client keys signed by the original (server) key.

```js
var pems = selfsigned.generate(null, { clientCertificate: true });
console.log(pems)
```
Will return the following like this:

```js
{ private: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXQIBAAKBgQDLg/kS4dCPVu96sbK6MQuUPmhqnF8SeBXVHH18h+0BTj7HqnrA\r\nA75hNVIiSLTChvpzQ0qi2Ju7O2ESUOdx7cvGiftGuZLiI8uL2HVlYuX+wQTIoRHx\r\n9nxv56TIiqnPg5d05vSTLXoiJg5uac3a6+4vnhhTo0XRRXVVboZsfNpuGQIDAQAB\r\nAoGAfhCd9QhUPLZJWeNBJvzCg221GHUMn1Arlfsz8DPyp+BkGyKLLu4iu+xfmEUZ\r\nU3ZxJX0FeqJatTwvAT2EYJpAovx+F37PWFTLAS6T57WI1O5Lj1pTIKVkLrasNQgF\r\nl6qFD3cvEtCZve4LiwDoJ52FO2OtcDcMJ0r2oqbCXSDIlAECQQDnkkxKcTejBZGH\r\nyYEXG9hAznnEZ63LLzlHHF2cIPfxT+9826Wm0IzBxn8Wr4hcAbNx3bVKgsU9p7xA\r\nfKnSqObhAkEA4PwCjPQqxFpiYUmNt7htb8nCEvUDD/QSDyxAH/uJzfr6gOJOD5nT\r\n5gZYblC+CCMDkgDUpro6oATNyeRNoU3GOQJBANdaW26DWZ1WqV9hCpcGAxdJrT30\r\nuVASq66w93Ehy9LzZqFz1tqKacwvH7NmLGZ8AngrGdSgRnOvEMfb50aMYqECQDcG\r\nzCTnbzJZHOjIkaXWsMV/pjz2ugoD2wrk+sYXwoujj/NH5mnAaOhAsw5AJ0pcLfpe\r\nw6QHtmD+68ouUaJbIFkCQQDeu0AXAp6Kbk6570i2DpGUSnkRdGCGS+3ekqqJUpE7\r\nfVUSx1nCF1sPD0p+pO8Rj3i87iI4MlblQRm/wVkrkjiR\r\n-----END RSA PRIVATE KEY-----\r\n',
  public: '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLg/kS4dCPVu96sbK6MQuUPmhq\r\nnF8SeBXVHH18h+0BTj7HqnrAA75hNVIiSLTChvpzQ0qi2Ju7O2ESUOdx7cvGiftG\r\nuZLiI8uL2HVlYuX+wQTIoRHx9nxv56TIiqnPg5d05vSTLXoiJg5uac3a6+4vnhhT\r\no0XRRXVVboZsfNpuGQIDAQAB\r\n-----END PUBLIC KEY-----\r\n',
  cert: '-----BEGIN CERTIFICATE-----\r\nMIIClTCCAf6gAwIBAgIJdMZqoEeGMVYKMA0GCSqGSIb3DQEBBQUAMGkxFDASBgNV\r\nBAMTC2V4YW1wbGUub3JnMQswCQYDVQQGEwJVUzERMA8GA1UECBMIVmlyZ2luaWEx\r\nEzARBgNVBAcTCkJsYWNrc2J1cmcxDTALBgNVBAoTBFRlc3QxDTALBgNVBAsTBFRl\r\nc3QwHhcNMTUxMDI5MTMwNjA1WhcNMTYxMDI4MTMwNjA1WjBpMRQwEgYDVQQDEwtl\r\neGFtcGxlLm9yZzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYD\r\nVQQHEwpCbGFja3NidXJnMQ0wCwYDVQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MIGf\r\nMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLg/kS4dCPVu96sbK6MQuUPmhqnF8S\r\neBXVHH18h+0BTj7HqnrAA75hNVIiSLTChvpzQ0qi2Ju7O2ESUOdx7cvGiftGuZLi\r\nI8uL2HVlYuX+wQTIoRHx9nxv56TIiqnPg5d05vSTLXoiJg5uac3a6+4vnhhTo0XR\r\nRXVVboZsfNpuGQIDAQABo0UwQzAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIC9DAm\r\nBgNVHREEHzAdhhtodHRwOi8vZXhhbXBsZS5vcmcvd2ViaWQjbWUwDQYJKoZIhvcN\r\nAQEFBQADgYEAj1Yyyb0R9KRFjIWNFi6RErB/riWylW4CdOK1hOyJZ+VRBWeYLKfX\r\ni///V+tqRvLlYY5x5DnrjXbDjBy0CZuN/J772/Srgp7Nl5cn92zynMJK1q4MEEs3\r\nAE/FO85R0HbGEp+IrwUwDOLR6omBFVdh1EUOTcQU2jLZNbWvLDiWbDo=\r\n-----END CERTIFICATE-----\r\n',
  clientprivate: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICWwIBAAKBgQDjR5FrrdZ1jirqkx3KMPnGjrcObj/vmztWTEZ1kX6gTskQugJU\r\noxktzwDZza4jYODC6Ud2jouFLWeAi5BDSAeLwAQb951qVD9zVsmQ+63V/mvSJUoj\r\nigwj7YjcxyReJ17F0YgjceqrkZaPM8YRo8h1fj1JdPc4ZOUgA5ASZ0h2ewIDAQAB\r\nAoGAfB5DbjibG8ut6Di7VgX1AdhCY+EVjXaKqxAwklgIfOdJqpbKWwpO39NiNY+7\r\nf5qSZB8dZcNmsi4fjfWprPSTGVkk1Qp2uibtFS4MhbLEeyy4cgZfMIBQY+HD0Asf\r\n1NU7WTY5QfzgH3HAKuWpUEWdar/jE+hDPA+wnsMg+TgGARECQQDzlc+5WA9JsG9f\r\nwNRzhMGRxDP4QLmL0iLWupF4BMP/k4OLMjDtzWl725WJ4FjCzML7mSmkWWe/P8f5\r\nwrbR+e8lAkEA7t0CEsiIw8BE55YMuGIz5xI0QDnuwNWmCEmq6+ZziW3L+EuAr1S4\r\nDORqBYm5DuRvBWkWE9Sld0a8vNqWh58tHwJAP1ZYEhicuQuAmkRYucTuVEnRPZ8O\r\n4BV+65jNlIigskcYMEyXvm3oHMWnJ5fHXLfDh4p28n4w5ODfzcjcotK7ZQJAE7bX\r\n8fbtGsLmrPp8aEdqozqkZ1ygsPexMWPrIHcvt/sA56hLoazrV90ORxC73lfKNfcb\r\nZF2bnoGPGEMuQ1lG3wJAPnHysm3DgbSHZQiXWMjF4YDRRV2AeOqX1fmlSeMErwdj\r\ncwIs+ikIBnOwUOh6liJ7yK1YnckDTZTOfUDyG+vdFQ==\r\n-----END RSA PRIVATE KEY-----\r\n',
  clientpublic: '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjR5FrrdZ1jirqkx3KMPnGjrcO\r\nbj/vmztWTEZ1kX6gTskQugJUoxktzwDZza4jYODC6Ud2jouFLWeAi5BDSAeLwAQb\r\n951qVD9zVsmQ+63V/mvSJUojigwj7YjcxyReJ17F0YgjceqrkZaPM8YRo8h1fj1J\r\ndPc4ZOUgA5ASZ0h2ewIDAQAB\r\n-----END PUBLIC KEY-----\r\n',
  clientcert: '-----BEGIN CERTIFICATE-----\r\nMIICSzCCAbSgAwIBAgIBAjANBgkqhkiG9w0BAQUFADBpMRQwEgYDVQQDEwtleGFt\r\ncGxlLm9yZzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQH\r\nEwpCbGFja3NidXJnMQ0wCwYDVQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MB4XDTE1\r\nMTAyOTEzMDYwNVoXDTE2MTAyOTEzMDYwNVowbjEZMBcGA1UEAxMQSm9obiBEb2Ug\r\namRvZTEyMzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQH\r\nEwpCbGFja3NidXJnMQ0wCwYDVQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MIGfMA0G\r\nCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjR5FrrdZ1jirqkx3KMPnGjrcObj/vmztW\r\nTEZ1kX6gTskQugJUoxktzwDZza4jYODC6Ud2jouFLWeAi5BDSAeLwAQb951qVD9z\r\nVsmQ+63V/mvSJUojigwj7YjcxyReJ17F0YgjceqrkZaPM8YRo8h1fj1JdPc4ZOUg\r\nA5ASZ0h2ewIDAQABMA0GCSqGSIb3DQEBBQUAA4GBACOUglBxJ80jzR3DSSMrgRav\r\n7deKUPShEPC3tbVrc3LHPGpCEJUC309aK2mbMwz2jX78tr/ezePELKbyRggUvVgN\r\nB0XdIQkpR9X4mPdtFYkMiWKNVYKd79r0kolprgFPryhT3jsICIOnwE1Ur23Q+Fk2\r\nnizRS0HY4Q25JLCmsWWy\r\n-----END CERTIFICATE-----\r\n' }
```

To override the default client CN of `john doe jdoe123`, add another option for `clientCertificateCN`:

```js
var pems = selfsigned.generate(null, { clientCertificate: true, clientCertificateCN: 'FooBar' });
```

## License

MIT
