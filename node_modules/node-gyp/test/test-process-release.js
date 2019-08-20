var test = require('tape')
var processRelease = require('../lib/process-release')

test('test process release - process.version = 0.8.20', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.8.20', null)

  t.equal(release.semver.version, '0.8.20')
  delete release.semver

  t.deepEqual(release, {
    version: '0.8.20',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.8.20/',
    tarballUrl: 'https://nodejs.org/dist/v0.8.20/node-v0.8.20.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.8.20/SHASUMS256.txt',
    versionDir: '0.8.20',
    libUrl32: 'https://nodejs.org/dist/v0.8.20/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.8.20/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

test('test process release - process.version = 0.10.21', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.10.21', null)

  t.equal(release.semver.version, '0.10.21')
  delete release.semver

  t.deepEqual(release, {
    version: '0.10.21',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.10.21/',
    tarballUrl: 'https://nodejs.org/dist/v0.10.21/node-v0.10.21.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.10.21/SHASUMS256.txt',
    versionDir: '0.10.21',
    libUrl32: 'https://nodejs.org/dist/v0.10.21/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.10.21/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

// prior to -headers.tar.gz
test('test process release - process.version = 0.12.9', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.12.9', null)

  t.equal(release.semver.version, '0.12.9')
  delete release.semver

  t.deepEqual(release, {
    version: '0.12.9',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.12.9/',
    tarballUrl: 'https://nodejs.org/dist/v0.12.9/node-v0.12.9.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.12.9/SHASUMS256.txt',
    versionDir: '0.12.9',
    libUrl32: 'https://nodejs.org/dist/v0.12.9/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.12.9/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

// prior to -headers.tar.gz
test('test process release - process.version = 0.10.41', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.10.41', null)

  t.equal(release.semver.version, '0.10.41')
  delete release.semver

  t.deepEqual(release, {
    version: '0.10.41',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.10.41/',
    tarballUrl: 'https://nodejs.org/dist/v0.10.41/node-v0.10.41.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.10.41/SHASUMS256.txt',
    versionDir: '0.10.41',
    libUrl32: 'https://nodejs.org/dist/v0.10.41/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.10.41/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

// has -headers.tar.gz
test('test process release - process.release ~ node@0.10.42', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.10.42', null)

  t.equal(release.semver.version, '0.10.42')
  delete release.semver

  t.deepEqual(release, {
    version: '0.10.42',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.10.42/',
    tarballUrl: 'https://nodejs.org/dist/v0.10.42/node-v0.10.42-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.10.42/SHASUMS256.txt',
    versionDir: '0.10.42',
    libUrl32: 'https://nodejs.org/dist/v0.10.42/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.10.42/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

// has -headers.tar.gz
test('test process release - process.release ~ node@0.12.10', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v0.12.10', null)

  t.equal(release.semver.version, '0.12.10')
  delete release.semver

  t.deepEqual(release, {
    version: '0.12.10',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.12.10/',
    tarballUrl: 'https://nodejs.org/dist/v0.12.10/node-v0.12.10-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.12.10/SHASUMS256.txt',
    versionDir: '0.12.10',
    libUrl32: 'https://nodejs.org/dist/v0.12.10/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.12.10/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

test('test process release - process.release ~ node@4.1.23', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v4.1.23/',
    tarballUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v4.1.23/SHASUMS256.txt',
    versionDir: '4.1.23',
    libUrl32: 'https://nodejs.org/dist/v4.1.23/win-x86/node.lib',
    libUrl64: 'https://nodejs.org/dist/v4.1.23/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})

test('test process release - process.release ~ node@4.1.23 / corp build', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://some.custom.location/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'node',
    baseUrl: 'https://some.custom.location/',
    tarballUrl: 'https://some.custom.location/node-v4.1.23-headers.tar.gz',
    shasumsUrl: 'https://some.custom.location/SHASUMS256.txt',
    versionDir: '4.1.23',
    libUrl32: 'https://some.custom.location/win-x86/node.lib',
    libUrl64: 'https://some.custom.location/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})

test('test process release - process.version = 1.8.4', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v1.8.4', null)

  t.equal(release.semver.version, '1.8.4')
  delete release.semver

  t.deepEqual(release, {
    version: '1.8.4',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v1.8.4/',
    tarballUrl: 'https://iojs.org/download/release/v1.8.4/iojs-v1.8.4.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v1.8.4/SHASUMS256.txt',
    versionDir: 'iojs-1.8.4',
    libUrl32: 'https://iojs.org/download/release/v1.8.4/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v1.8.4/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ iojs@3.2.24', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v3.2.24', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.24/iojs-v3.2.24-headers.tar.gz'
  })

  t.equal(release.semver.version, '3.2.24')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.24',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v3.2.24/',
    tarballUrl: 'https://iojs.org/download/release/v3.2.24/iojs-v3.2.24-headers.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v3.2.24/SHASUMS256.txt',
    versionDir: 'iojs-3.2.24',
    libUrl32: 'https://iojs.org/download/release/v3.2.24/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v3.2.24/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ iojs@3.2.11 +libUrl32', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v3.2.11', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.11/iojs-v3.2.11-headers.tar.gz',
    libUrl: 'https://iojs.org/download/release/v3.2.11/win-x86/iojs.lib' // custom
  })

  t.equal(release.semver.version, '3.2.11')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.11',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v3.2.11/',
    tarballUrl: 'https://iojs.org/download/release/v3.2.11/iojs-v3.2.11-headers.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v3.2.11/SHASUMS256.txt',
    versionDir: 'iojs-3.2.11',
    libUrl32: 'https://iojs.org/download/release/v3.2.11/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v3.2.11/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ iojs@3.2.101 +libUrl64', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v3.2.101', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.101/iojs-v3.2.101-headers.tar.gz',
    libUrl: 'https://iojs.org/download/release/v3.2.101/win-x64/iojs.lib' // custom
  })

  t.equal(release.semver.version, '3.2.101')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.101',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v3.2.101/',
    tarballUrl: 'https://iojs.org/download/release/v3.2.101/iojs-v3.2.101-headers.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v3.2.101/SHASUMS256.txt',
    versionDir: 'iojs-3.2.101',
    libUrl32: 'https://iojs.org/download/release/v3.2.101/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v3.2.101/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ iojs@3.3.0 - borked win-ia32', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v3.2.101', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.101/iojs-v3.2.101-headers.tar.gz',
    libUrl: 'https://iojs.org/download/release/v3.2.101/win-ia32/iojs.lib' // custom
  })

  t.equal(release.semver.version, '3.2.101')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.101',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v3.2.101/',
    tarballUrl: 'https://iojs.org/download/release/v3.2.101/iojs-v3.2.101-headers.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v3.2.101/SHASUMS256.txt',
    versionDir: 'iojs-3.2.101',
    libUrl32: 'https://iojs.org/download/release/v3.2.101/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v3.2.101/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ node@4.1.23 --target=0.10.40', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: { target: '0.10.40' } }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '0.10.40')
  delete release.semver

  t.deepEqual(release, {
    version: '0.10.40',
    name: 'node',
    baseUrl: 'https://nodejs.org/dist/v0.10.40/',
    tarballUrl: 'https://nodejs.org/dist/v0.10.40/node-v0.10.40.tar.gz',
    shasumsUrl: 'https://nodejs.org/dist/v0.10.40/SHASUMS256.txt',
    versionDir: '0.10.40',
    libUrl32: 'https://nodejs.org/dist/v0.10.40/node.lib',
    libUrl64: 'https://nodejs.org/dist/v0.10.40/x64/node.lib',
    libPath32: 'node.lib',
    libPath64: 'x64/node.lib'
  })
})

test('test process release - process.release ~ node@4.1.23 --target=1.8.4', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: { target: '1.8.4' } }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '1.8.4')
  delete release.semver

  t.deepEqual(release, {
    version: '1.8.4',
    name: 'iojs',
    baseUrl: 'https://iojs.org/download/release/v1.8.4/',
    tarballUrl: 'https://iojs.org/download/release/v1.8.4/iojs-v1.8.4.tar.gz',
    shasumsUrl: 'https://iojs.org/download/release/v1.8.4/SHASUMS256.txt',
    versionDir: 'iojs-1.8.4',
    libUrl32: 'https://iojs.org/download/release/v1.8.4/win-x86/iojs.lib',
    libUrl64: 'https://iojs.org/download/release/v1.8.4/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })
})

test('test process release - process.release ~ node@4.1.23 --dist-url=https://foo.bar/baz', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: { 'dist-url': 'https://foo.bar/baz' } }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'node',
    baseUrl: 'https://foo.bar/baz/v4.1.23/',
    tarballUrl: 'https://foo.bar/baz/v4.1.23/node-v4.1.23-headers.tar.gz',
    shasumsUrl: 'https://foo.bar/baz/v4.1.23/SHASUMS256.txt',
    versionDir: '4.1.23',
    libUrl32: 'https://foo.bar/baz/v4.1.23/win-x86/node.lib',
    libUrl64: 'https://foo.bar/baz/v4.1.23/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})

test('test process release - process.release ~ frankenstein@4.1.23', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v4.1.23', {
    name: 'frankenstein',
    headersUrl: 'https://frankensteinjs.org/dist/v4.1.23/frankenstein-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'frankenstein',
    baseUrl: 'https://frankensteinjs.org/dist/v4.1.23/',
    tarballUrl: 'https://frankensteinjs.org/dist/v4.1.23/frankenstein-v4.1.23-headers.tar.gz',
    shasumsUrl: 'https://frankensteinjs.org/dist/v4.1.23/SHASUMS256.txt',
    versionDir: 'frankenstein-4.1.23',
    libUrl32: 'https://frankensteinjs.org/dist/v4.1.23/win-x86/frankenstein.lib',
    libUrl64: 'https://frankensteinjs.org/dist/v4.1.23/win-x64/frankenstein.lib',
    libPath32: 'win-x86/frankenstein.lib',
    libPath64: 'win-x64/frankenstein.lib'
  })
})


test('test process release - process.release ~ frankenstein@4.1.23 --dist-url=http://foo.bar/baz/', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: { 'dist-url': 'http://foo.bar/baz/' } }, 'v4.1.23', {
    name: 'frankenstein',
    headersUrl: 'https://frankensteinjs.org/dist/v4.1.23/frankenstein-v4.1.23.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'frankenstein',
    baseUrl: 'http://foo.bar/baz/v4.1.23/',
    tarballUrl: 'http://foo.bar/baz/v4.1.23/frankenstein-v4.1.23-headers.tar.gz',
    shasumsUrl: 'http://foo.bar/baz/v4.1.23/SHASUMS256.txt',
    versionDir: 'frankenstein-4.1.23',
    libUrl32: 'http://foo.bar/baz/v4.1.23/win-x86/frankenstein.lib',
    libUrl64: 'http://foo.bar/baz/v4.1.23/win-x64/frankenstein.lib',
    libPath32: 'win-x86/frankenstein.lib',
    libPath64: 'win-x64/frankenstein.lib'
  })
})

test('test process release - process.release ~ node@4.0.0-rc.4', function (t) {
  t.plan(2)

  var release = processRelease([], { opts: {} }, 'v4.0.0-rc.4', {
    name: 'node',
    headersUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.0.0-rc.4')
  delete release.semver

  t.deepEqual(release, {
    version: '4.0.0-rc.4',
    name: 'node',
    baseUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/',
    tarballUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/SHASUMS256.txt',
    versionDir: '4.0.0-rc.4',
    libUrl32: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x86/node.lib',
    libUrl64: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})


test('test process release - process.release ~ node@4.0.0-rc.4 passed as argv[0]', function (t) {
  t.plan(2)

  // note the missing 'v' on the arg, it should normalise when checking
  // whether we're on the default or not
  var release = processRelease([ '4.0.0-rc.4' ], { opts: {} }, 'v4.0.0-rc.4', {
    name: 'node',
    headersUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.0.0-rc.4')
  delete release.semver

  t.deepEqual(release, {
    version: '4.0.0-rc.4',
    name: 'node',
    baseUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/',
    tarballUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/SHASUMS256.txt',
    versionDir: '4.0.0-rc.4',
    libUrl32: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x86/node.lib',
    libUrl64: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})


test('test process release - process.release ~ node@4.0.0-rc.4 - bogus string passed as argv[0]', function (t) {
  t.plan(2)

  // additional arguments can be passed in on the commandline that should be ignored if they
  // are not specifying a valid version @ position 0
  var release = processRelease([ 'this is no version!' ], { opts: {} }, 'v4.0.0-rc.4', {
    name: 'node',
    headersUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.0.0-rc.4')
  delete release.semver

  t.deepEqual(release, {
    version: '4.0.0-rc.4',
    name: 'node',
    baseUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/',
    tarballUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/node-v4.0.0-rc.4-headers.tar.gz',
    shasumsUrl: 'https://nodejs.org/download/rc/v4.0.0-rc.4/SHASUMS256.txt',
    versionDir: '4.0.0-rc.4',
    libUrl32: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x86/node.lib',
    libUrl64: 'https://nodejs.org/download/rc/v4.0.0-rc.4/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })
})

test('test process release - NODEJS_ORG_MIRROR', function (t) {
  t.plan(2)

  process.env.NODEJS_ORG_MIRROR = 'http://foo.bar'

  var release = processRelease([], { opts: {} }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'node',
    baseUrl: 'http://foo.bar/v4.1.23/',
    tarballUrl: 'http://foo.bar/v4.1.23/node-v4.1.23-headers.tar.gz',
    shasumsUrl: 'http://foo.bar/v4.1.23/SHASUMS256.txt',
    versionDir: '4.1.23',
    libUrl32: 'http://foo.bar/v4.1.23/win-x86/node.lib',
    libUrl64: 'http://foo.bar/v4.1.23/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })

  delete process.env.NODEJS_ORG_MIRROR
})

test('test process release - NVM_NODEJS_ORG_MIRROR', function (t) {
  t.plan(2)

  process.env.NVM_NODEJS_ORG_MIRROR = 'http://foo.bar'

  var release = processRelease([], { opts: {} }, 'v4.1.23', {
    name: 'node',
    headersUrl: 'https://nodejs.org/dist/v4.1.23/node-v4.1.23-headers.tar.gz'
  })

  t.equal(release.semver.version, '4.1.23')
  delete release.semver

  t.deepEqual(release, {
    version: '4.1.23',
    name: 'node',
    baseUrl: 'http://foo.bar/v4.1.23/',
    tarballUrl: 'http://foo.bar/v4.1.23/node-v4.1.23-headers.tar.gz',
    shasumsUrl: 'http://foo.bar/v4.1.23/SHASUMS256.txt',
    versionDir: '4.1.23',
    libUrl32: 'http://foo.bar/v4.1.23/win-x86/node.lib',
    libUrl64: 'http://foo.bar/v4.1.23/win-x64/node.lib',
    libPath32: 'win-x86/node.lib',
    libPath64: 'win-x64/node.lib'
  })

  delete process.env.NVM_NODEJS_ORG_MIRROR
})

test('test process release - IOJS_ORG_MIRROR', function (t) {
  t.plan(2)

  process.env.IOJS_ORG_MIRROR = 'http://foo.bar'

  var release = processRelease([], { opts: {} }, 'v3.2.24', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.24/iojs-v3.2.24-headers.tar.gz'
  })

  t.equal(release.semver.version, '3.2.24')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.24',
    name: 'iojs',
    baseUrl: 'http://foo.bar/v3.2.24/',
    tarballUrl: 'http://foo.bar/v3.2.24/iojs-v3.2.24-headers.tar.gz',
    shasumsUrl: 'http://foo.bar/v3.2.24/SHASUMS256.txt',
    versionDir: 'iojs-3.2.24',
    libUrl32: 'http://foo.bar/v3.2.24/win-x86/iojs.lib',
    libUrl64: 'http://foo.bar/v3.2.24/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })

  delete process.env.IOJS_ORG_MIRROR
})


test('test process release - NVM_IOJS_ORG_MIRROR', function (t) {
  t.plan(2)

  process.env.NVM_IOJS_ORG_MIRROR = 'http://foo.bar'

  var release = processRelease([], { opts: {} }, 'v3.2.24', {
    name: 'io.js',
    headersUrl: 'https://iojs.org/download/release/v3.2.24/iojs-v3.2.24-headers.tar.gz'
  })

  t.equal(release.semver.version, '3.2.24')
  delete release.semver

  t.deepEqual(release, {
    version: '3.2.24',
    name: 'iojs',
    baseUrl: 'http://foo.bar/v3.2.24/',
    tarballUrl: 'http://foo.bar/v3.2.24/iojs-v3.2.24-headers.tar.gz',
    shasumsUrl: 'http://foo.bar/v3.2.24/SHASUMS256.txt',
    versionDir: 'iojs-3.2.24',
    libUrl32: 'http://foo.bar/v3.2.24/win-x86/iojs.lib',
    libUrl64: 'http://foo.bar/v3.2.24/win-x64/iojs.lib',
    libPath32: 'win-x86/iojs.lib',
    libPath64: 'win-x64/iojs.lib'
  })

  delete process.env.NVM_IOJS_ORG_MIRROR
})
