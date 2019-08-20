# devcert - Development SSL made easy

So, running a local HTTPS server usually sucks. There's a range of approaches,
each with their own tradeoff. The common one, using self-signed certificates,
means having to ignore scary browser warnings for each project.

devcert makes the process easy. Want a private key and certificate file to use
with your server? Just ask:

```js
import { createServer } from 'https';
import * as express from 'express';
import getDevelopmentCertificate from 'devcert';

async function buildMyApp() {
  let app = express();

  app.get('/', function (req, res) {
    res.send('Hello Secure World!');
  });

  let ssl;
  if (process.env.NODE_ENV === 'development') {
    ssl = await getDevelopmentCertificate('my-app', { installCertutil: true });
  } else {
    ssl = // load production ssl ...
  }

  return createServer(ssl, app).listen(3000);
}
```

Now open https://localhost:3000 and voila - your page loads with no scary
warnings or hoops to jump through.

> Certificates are cached by name, so two calls for
`getDevelopmentCertificate('foo')` will return the same key and certificate.

### installCertutil option

devcert currently takes a single option: `installCertutil`. If true, devcert
will attempt to install some software necessary to tell Firefox (and Chrome on
Linux) to trust your development certificates. This is not required, but without
it, you'll need to tell Firefox to trust these certificates manually:

Firefox provides a point-and-click wizard for importing and trusting a
certificate, so if you don't provide `installCertutil: true` to devcert, we'll
instead open Firefox and kick off this wizard for you. Simply follow the prompts
to trust the certificate. **Reminder: you'll only need to do this once per
machine**

**Note:** Chrome on Linux **requires** `installCertutil: true`, or else you'll
face the scary browser warnings every time. Unfortunately, there's no way to
tell Chrome on Linux to trust a certificate without install certutil.

The software installed varies by OS:

* Mac: `brew install nss`
* Linux: `apt install libnss3-tools`
* Windows: N/A

## How it works

When you ask for a development certificate, devcert will first check to see if
it has run on this machine before. If not, it will create a root certificate
authority and add it to your OS and various browser trust stores. You'll likely
see password prompts from your OS at this point to authorize the new root CA.
This is the only time you'll see these prompts.

This root certificate authority allows devcert to create a new SSL certificate
whenever you want without needing to ask for elevated permissions again. It also
ensures that browsers won't show scary warnings about untrusted certificates,
since your OS and browsers will now trust devcert's certificates. The root CA
certificate is unique to your machine only, and is generated on-the-fly when it
is installed.

## License

MIT © [Dave Wasmer](http://davewasmer.com)
