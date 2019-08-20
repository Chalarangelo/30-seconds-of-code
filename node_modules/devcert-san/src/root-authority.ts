import { readFileSync, writeFileSync, existsSync } from 'fs';
import { exec } from 'child_process';
import * as http from 'http';
import * as path from 'path';
import * as getPort from 'get-port';
import * as createDebug from 'debug';
import { sync as commandExists } from 'command-exists';
import * as glob from 'glob';
import * as eol from 'eol';

import {
  isMac,
  isLinux,
  isWindows,
  configPath,
  rootKeyPath,
  rootCertPath,
  opensslConfPath,
  opensslConfTemplate
} from './constants';
import {
  openssl,
  generateKey,
  run,
  waitForUser
} from './utils';

const debug = createDebug('devcert');

// Install the once-per-machine trusted root CA. We'll use this CA to sign per-app certs, allowing
// us to minimize the need for elevated permissions while still allowing for per-app certificates.
export default async function installCertificateAuthority(installCertutil: boolean): Promise<void> {
  debug(`generating openssl configuration`);
  generateOpenSSLConfFiles();

  debug(`generating root certificate authority key`);
  generateKey(rootKeyPath);

  debug(`generating root certificate authority certificate`);
  openssl(`req -config ${ opensslConfPath } -key ${ rootKeyPath } -out ${ rootCertPath } -new -subj "/CN=devcert" -x509 -days 7000 -extensions v3_ca`);

  debug(`adding root certificate authority to trust stores`)
  if (isMac) {
    await addToMacTrustStores(installCertutil);
  } else if (isLinux) {
    await addToLinuxTrustStores(installCertutil);
  } else {
    await addToWindowsTrustStores();
  }
}

// Copy our openssl conf template to the local config folder, and update the paths to be OS
// specific. Also initializes the files openssl needs to sign certificates as a certificate
// authority
function generateOpenSSLConfFiles() {
  let confTemplate = readFileSync(opensslConfTemplate, 'utf-8');
  confTemplate = confTemplate.replace(/DATABASE_PATH/, configPath('index.txt').replace(/\\/g, '\\\\'));
  confTemplate = confTemplate.replace(/SERIAL_PATH/, configPath('serial').replace(/\\/g, '\\\\'));
  confTemplate = eol.auto(confTemplate);
  writeFileSync(opensslConfPath, confTemplate);
  writeFileSync(configPath('index.txt'), '');
  writeFileSync(configPath('serial'), '01');
  // This version number lets us write code in the future that intelligently upgrades an existing
  // devcert installation. This "ca-version" is independent of the devcert package version, and
  // tracks changes to the root certificate setup only.
  writeFileSync(configPath('devcert-ca-version'), '1');
}

// macOS is pretty simple - just add the certificate to the system keychain, and most applications
// will delegate to that for determining trusted certificates. Firefox, of course, does it's own
// thing. We can try to automatically install the cert with Firefox if we can use certutil via the
// `nss` Homebrew package, otherwise we go manual with user-facing prompts.
async function addToMacTrustStores(installCertutil: boolean): Promise<void> {
  // Chrome, Safari, system utils
  debug('adding devcert root CA to macOS system keychain');
  run(`sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain -p ssl -p basic "${ rootCertPath }"`);
  // Firefox
  try {
    // Try to use certutil to install the cert automatically
    debug('adding devcert root CA to firefox');
    await addCertificateToNSSCertDB(path.join(process.env.HOME, 'Library/Application Support/Firefox/Profiles/*'), {
      installCertutil,
      checkForOpenFirefox: true
    });
  } catch (e) {
    // Otherwise, open the cert in Firefox to install it
    await openCertificateInFirefox('/Applications/Firefox.app/Contents/MacOS/firefox');
  }
}

// Linux is surprisingly difficult. There seems to be multiple system-wide repositories for certs,
// so we copy ours to each. However, Firefox does it's usual separate trust store. Plus Chrome
// relies on the NSS tooling (like Firefox), but uses the user's NSS database, unlike Firefox which
// uses a separate Mozilla one. And since Chrome doesn't prompt the user with a GUI flow when
// opening certs, if we can't use certutil, we're out of luck.
async function addToLinuxTrustStores(installCertutil: boolean): Promise<void> {
  // system utils
  debug('adding devcert root CA to linux system-wide certificates');
  run(`sudo cp ${ rootCertPath } /etc/ssl/certs/devcert.pem`);
  run(`sudo cp ${ rootCertPath } /usr/local/share/ca-certificates/devcert.cer`);
  run(`sudo update-ca-certificates`);
  // Firefox
  try {
    // Try to use certutil to install the cert automatically
    debug('adding devcert root CA to firefox');
    await addCertificateToNSSCertDB(path.join(process.env.HOME, '.mozilla/firefox/*'), {
      installCertutil,
      checkForOpenFirefox: true
    });
  } catch (e) {
    // Otherwise, open the cert in Firefox to install it
    await openCertificateInFirefox('firefox');
  }
  // Chrome
  try {
    debug('adding devcert root CA to chrome');
    await addCertificateToNSSCertDB(path.join(process.env.HOME, '.pki/nssdb'), { installCertutil });
  } catch (e) {
    console.warn(`
WARNING: Because you did not pass in \`installCertutil: true\` to devcert, we
are unable to update Chrome to automatically trust generated development
certificates. The certificates will work, but Chrome will continue to warn you
that they are untrusted.`);
  }
}

// Windows is at least simple. Like macOS, most applications will delegate to the system trust
// store, which is updated with the confusingly named `certutil` exe (not the same as the
// NSS/Mozilla certutil). Firefox does it's own thing as usual, and getting a copy of NSS certutil
// onto the Windows machine to try updating the Firefox store is basically a nightmare, so we don't
// even try it - we just bail out to the GUI.
async function addToWindowsTrustStores(): Promise<void> {
  // IE, Chrome, system utils
  debug('adding devcert root to Windows OS trust store')
  run(`certutil -addstore -user root ${ rootCertPath }`);
  // Firefox (don't even try NSS certutil, no easy install for Windows)
  await openCertificateInFirefox('start firefox');
}

// Given a directory or glob pattern of directories, attempt to install the certificate to each
// directory containing an NSS database.
async function addCertificateToNSSCertDB(nssDirGlob: string, options: { installCertutil?: boolean, checkForOpenFirefox?: boolean } = {}): Promise<void> {
  let certutilPath = lookupOrInstallCertutil(options.installCertutil);
  if (!certutilPath) {
    throw new Error('certutil not available, and `installCertutil` was false');
  }
  // Firefox appears to load the NSS database in-memory on startup, and overwrite on exit. So we
  // have to ask the user to quite Firefox first so our changes don't get overwritten.
  if (options.checkForOpenFirefox) {
    let runningProcesses = run('ps aux');
    if (runningProcesses.indexOf('firefox') > -1) {
      console.log('Please close Firefox before continuing (Press <Enter> when ready)');
      await waitForUser();
    }
  }
  debug(`trying to install certificate into NSS databases in ${ nssDirGlob }`);
  glob.sync(nssDirGlob).forEach((potentialNSSDBDir) => {
    debug(`checking to see if ${ potentialNSSDBDir } is a valid NSS database directory`);
    if (existsSync(path.join(potentialNSSDBDir, 'cert8.db'))) {
      debug(`Found legacy NSS database in ${ potentialNSSDBDir }, adding devcert ...`)
      run(`${ certutilPath } -A -d "${ potentialNSSDBDir }" -t 'C,,' -i ${ rootCertPath } -n devcert`);
    } else if (existsSync(path.join(potentialNSSDBDir, 'cert9.db'))) {
      debug(`Found modern NSS database in ${ potentialNSSDBDir }, adding devcert ...`)
      run(`${ certutilPath } -A -d "sql:${ potentialNSSDBDir }" -t 'C,,' -i ${ rootCertPath } -n devcert`);
    }
  });
}

// When a Firefox tab is directed to a URL that returns a certificate, it will automatically prompt
// the user if they want to add it to their trusted certificates. This is handy since Firefox is by
// far the most troublesome to handle. If we can't automatically install the certificate (because
// certutil is not available / installable), we instead start a quick web server and host our
// certificate file. Then we open the hosted cert URL in Firefox to kick off the GUI flow.
async function openCertificateInFirefox(firefoxPath: string): Promise<void> {
  debug('adding devert to firefox manually - launch webserver for certificate hosting');
  let port = await getPort();
  let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/x-x509-ca-cert' });
    res.write(readFileSync(rootCertPath));
    res.end();
  }).listen(port);
  debug('certificate is hosted, starting firefox at hosted URL');
  console.log(`Unable to automatically install SSL certificate - please follow the prompts at http://localhost:${ port } in Firefox to trust the root certificate`);
  console.log('See https://github.com/davewasmer/devcert#how-it-works for more details');
  console.log('-- Press <Enter> once you finish the Firefox prompts --');
  exec(`${ firefoxPath } http://localhost:${ port }`);
  await waitForUser();
}

// Try to install certutil if it's not already available, and return the path to the executable
function lookupOrInstallCertutil(installCertutil: boolean): boolean | string {
  debug('looking for nss tooling ...')
  if (isMac) {
    debug('on mac, looking for homebrew (the only method to install nss that is currently supported by devcert');
    if (commandExists('brew')) {
      let nssPath: string;
      let certutilPath: string;
      try {
        certutilPath = path.join(run('brew --prefix nss').toString().trim(), 'bin', 'certutil');
      } catch (e) {
        debug('brew was found, but nss is not installed');
        if (installCertutil) {
          debug('attempting to install nss via brew');
          run('brew install nss');
          certutilPath = path.join(run('brew --prefix nss').toString().trim(), 'bin', 'certutil');
        } else {
          return false;
        }
      }
      debug(`Found nss installed at ${ certutilPath }`);
      return certutilPath;
    }
  } else if (isLinux) {
    debug('on linux, checking is nss is already installed');
    if (!commandExists('certutil')) {
      if (installCertutil) {
        debug('not already installed, installing it ourselves');
        run('sudo apt install libnss3-tools');
      } else {
        debug('not installed and do not want to install');
        return false;
      }
    }
    debug('looks like nss is installed');
    return run('which certutil').toString().trim();
  }
  // Windows? Ha!
  return false;
}