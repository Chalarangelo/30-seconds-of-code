'use strict';

var ip = require('..');
var assert = require('assert');
var net = require('net');
var os = require('os');

describe('IP library for node.js', function() {
  describe('toBuffer()/toString() methods', function() {
    it('should convert to buffer IPv4 address', function() {
      var buf = ip.toBuffer('127.0.0.1');
      assert.equal(buf.toString('hex'), '7f000001');
      assert.equal(ip.toString(buf), '127.0.0.1');
    });

    it('should convert to buffer IPv4 address in-place', function() {
      var buf = new Buffer(128);
      var offset = 64;
      ip.toBuffer('127.0.0.1', buf, offset);
      assert.equal(buf.toString('hex', offset, offset + 4), '7f000001');
      assert.equal(ip.toString(buf, offset, 4), '127.0.0.1');
    });

    it('should convert to buffer IPv6 address', function() {
      var buf = ip.toBuffer('::1');
      assert(/(00){15,15}01/.test(buf.toString('hex')));
      assert.equal(ip.toString(buf), '::1');
      assert.equal(ip.toString(ip.toBuffer('1::')), '1::');
      assert.equal(ip.toString(ip.toBuffer('abcd::dcba')), 'abcd::dcba');
    });

    it('should convert to buffer IPv6 address in-place', function() {
      var buf = new Buffer(128);
      var offset = 64;
      ip.toBuffer('::1', buf, offset);
      assert(/(00){15,15}01/.test(buf.toString('hex', offset, offset + 16)));
      assert.equal(ip.toString(buf, offset, 16), '::1');
      assert.equal(ip.toString(ip.toBuffer('1::', buf, offset),
                               offset, 16), '1::');
      assert.equal(ip.toString(ip.toBuffer('abcd::dcba', buf, offset),
                               offset, 16), 'abcd::dcba');
    });

    it('should convert to buffer IPv6 mapped IPv4 address', function() {
      var buf = ip.toBuffer('::ffff:127.0.0.1');
      assert.equal(buf.toString('hex'), '00000000000000000000ffff7f000001');
      assert.equal(ip.toString(buf), '::ffff:7f00:1');

      buf = ip.toBuffer('ffff::127.0.0.1');
      assert.equal(buf.toString('hex'), 'ffff000000000000000000007f000001');
      assert.equal(ip.toString(buf), 'ffff::7f00:1');

      buf = ip.toBuffer('0:0:0:0:0:ffff:127.0.0.1');
      assert.equal(buf.toString('hex'), '00000000000000000000ffff7f000001');
      assert.equal(ip.toString(buf), '::ffff:7f00:1');
    });
  });

  describe('fromPrefixLen() method', function() {
    it('should create IPv4 mask', function() {
      assert.equal(ip.fromPrefixLen(24), '255.255.255.0');
    });
    it('should create IPv6 mask', function() {
      assert.equal(ip.fromPrefixLen(64), 'ffff:ffff:ffff:ffff::');
    });
    it('should create IPv6 mask explicitly', function() {
      assert.equal(ip.fromPrefixLen(24, 'IPV6'), 'ffff:ff00::');
    });
  });

  describe('not() method', function() {
    it('should reverse bits in address', function() {
      assert.equal(ip.not('255.255.255.0'), '0.0.0.255');
    });
  });

  describe('or() method', function() {
    it('should or bits in ipv4 addresses', function() {
      assert.equal(ip.or('0.0.0.255', '192.168.1.10'), '192.168.1.255');
    });
    it('should or bits in ipv6 addresses', function() {
      assert.equal(ip.or('::ff', '::abcd:dcba:abcd:dcba'),
                   '::abcd:dcba:abcd:dcff');
    });
    it('should or bits in mixed addresses', function() {
      assert.equal(ip.or('0.0.0.255', '::abcd:dcba:abcd:dcba'),
                   '::abcd:dcba:abcd:dcff');
    });
  });

  describe('mask() method', function() {
    it('should mask bits in address', function() {
      assert.equal(ip.mask('192.168.1.134', '255.255.255.0'), '192.168.1.0');
      assert.equal(ip.mask('192.168.1.134', '::ffff:ff00'), '::ffff:c0a8:100');
    });

    it('should not leak data', function() {
      for (var i = 0; i < 10; i++)
        assert.equal(ip.mask('::1', '0.0.0.0'), '::');
    });
  });

  describe('subnet() method', function() {
    // Test cases calculated with http://www.subnet-calculator.com/
    var ipv4Subnet = ip.subnet('192.168.1.134', '255.255.255.192');

    it('should compute ipv4 network address', function() {
      assert.equal(ipv4Subnet.networkAddress, '192.168.1.128');
    });

    it('should compute ipv4 network\'s first address', function() {
      assert.equal(ipv4Subnet.firstAddress, '192.168.1.129');
    });

    it('should compute ipv4 network\'s last address', function() {
      assert.equal(ipv4Subnet.lastAddress, '192.168.1.190');
    });

    it('should compute ipv4 broadcast address', function() {
      assert.equal(ipv4Subnet.broadcastAddress, '192.168.1.191');
    });

    it('should compute ipv4 subnet number of addresses', function() {
      assert.equal(ipv4Subnet.length, 64);
    });

    it('should compute ipv4 subnet number of addressable hosts', function() {
      assert.equal(ipv4Subnet.numHosts, 62);
    });

    it('should compute ipv4 subnet mask', function() {
      assert.equal(ipv4Subnet.subnetMask, '255.255.255.192');
    });

    it('should compute ipv4 subnet mask\'s length', function() {
      assert.equal(ipv4Subnet.subnetMaskLength, 26);
    });

    it('should know whether a subnet contains an address', function() {
      assert.equal(ipv4Subnet.contains('192.168.1.180'), true);
    });

    it('should know whether a subnet does not contain an address', function() {
      assert.equal(ipv4Subnet.contains('192.168.1.195'), false);
    });
  });

  describe('subnet() method with mask length 32', function() {
    // Test cases calculated with http://www.subnet-calculator.com/
    var ipv4Subnet = ip.subnet('192.168.1.134', '255.255.255.255');
    it('should compute ipv4 network\'s first address', function() {
      assert.equal(ipv4Subnet.firstAddress, '192.168.1.134');
    });

    it('should compute ipv4 network\'s last address', function() {
      assert.equal(ipv4Subnet.lastAddress, '192.168.1.134');
    });

    it('should compute ipv4 subnet number of addressable hosts', function() {
      assert.equal(ipv4Subnet.numHosts, 1);
    });
  });

  describe('subnet() method with mask length 31', function() {
    // Test cases calculated with http://www.subnet-calculator.com/
    var ipv4Subnet = ip.subnet('192.168.1.134', '255.255.255.254');
    it('should compute ipv4 network\'s first address', function() {
      assert.equal(ipv4Subnet.firstAddress, '192.168.1.134');
    });

    it('should compute ipv4 network\'s last address', function() {
      assert.equal(ipv4Subnet.lastAddress, '192.168.1.135');
    });

    it('should compute ipv4 subnet number of addressable hosts', function() {
      assert.equal(ipv4Subnet.numHosts, 2);
    });
  });

  describe('cidrSubnet() method', function() {
    // Test cases calculated with http://www.subnet-calculator.com/
    var ipv4Subnet = ip.cidrSubnet('192.168.1.134/26');

    it('should compute an ipv4 network address', function() {
      assert.equal(ipv4Subnet.networkAddress, '192.168.1.128');
    });

    it('should compute an ipv4 network\'s first address', function() {
      assert.equal(ipv4Subnet.firstAddress, '192.168.1.129');
    });

    it('should compute an ipv4 network\'s last address', function() {
      assert.equal(ipv4Subnet.lastAddress, '192.168.1.190');
    });

    it('should compute an ipv4 broadcast address', function() {
      assert.equal(ipv4Subnet.broadcastAddress, '192.168.1.191');
    });

    it('should compute an ipv4 subnet number of addresses', function() {
      assert.equal(ipv4Subnet.length, 64);
    });

    it('should compute an ipv4 subnet number of addressable hosts', function() {
      assert.equal(ipv4Subnet.numHosts, 62);
    });

    it('should compute an ipv4 subnet mask', function() {
      assert.equal(ipv4Subnet.subnetMask, '255.255.255.192');
    });

    it('should compute an ipv4 subnet mask\'s length', function() {
      assert.equal(ipv4Subnet.subnetMaskLength, 26);
    });

    it('should know whether a subnet contains an address', function() {
      assert.equal(ipv4Subnet.contains('192.168.1.180'), true);
    });

    it('should know whether a subnet contains an address', function() {
      assert.equal(ipv4Subnet.contains('192.168.1.195'), false);
    });

  });

  describe('cidr() method', function() {
    it('should mask address in CIDR notation', function() {
      assert.equal(ip.cidr('192.168.1.134/26'), '192.168.1.128');
      assert.equal(ip.cidr('2607:f0d0:1002:51::4/56'), '2607:f0d0:1002::');
    });
  });

  describe('isEqual() method', function() {
    it('should check if addresses are equal', function() {
      assert(ip.isEqual('127.0.0.1', '::7f00:1'));
      assert(!ip.isEqual('127.0.0.1', '::7f00:2'));
      assert(ip.isEqual('127.0.0.1', '::ffff:7f00:1'));
      assert(!ip.isEqual('127.0.0.1', '::ffaf:7f00:1'));
      assert(ip.isEqual('::ffff:127.0.0.1', '::ffff:127.0.0.1'));
      assert(ip.isEqual('::ffff:127.0.0.1', '127.0.0.1'));
    });
  });


  describe('isPrivate() method', function() {
    it('should check if an address is localhost', function() {
      assert.equal(ip.isPrivate('127.0.0.1'), true);
    });

    it('should check if an address is from a 192.168.x.x network', function() {
      assert.equal(ip.isPrivate('192.168.0.123'), true);
      assert.equal(ip.isPrivate('192.168.122.123'), true);
      assert.equal(ip.isPrivate('192.162.1.2'), false);
    });

    it('should check if an address is from a 172.16.x.x network', function() {
      assert.equal(ip.isPrivate('172.16.0.5'), true);
      assert.equal(ip.isPrivate('172.16.123.254'), true);
      assert.equal(ip.isPrivate('171.16.0.5'), false);
      assert.equal(ip.isPrivate('172.25.232.15'), true);
      assert.equal(ip.isPrivate('172.15.0.5'), false);
      assert.equal(ip.isPrivate('172.32.0.5'), false);
    });

    it('should check if an address is from a 169.254.x.x network', function() {
      assert.equal(ip.isPrivate('169.254.2.3'), true);
      assert.equal(ip.isPrivate('169.254.221.9'), true);
      assert.equal(ip.isPrivate('168.254.2.3'), false);
    });

    it('should check if an address is from a 10.x.x.x network', function() {
      assert.equal(ip.isPrivate('10.0.2.3'), true);
      assert.equal(ip.isPrivate('10.1.23.45'), true);
      assert.equal(ip.isPrivate('12.1.2.3'), false);
    });

    it('should check if an address is from a private IPv6 network', function() {
      assert.equal(ip.isPrivate('fd12:3456:789a:1::1'), true);
      assert.equal(ip.isPrivate('fe80::f2de:f1ff:fe3f:307e'), true);
      assert.equal(ip.isPrivate('::ffff:10.100.1.42'), true);
      assert.equal(ip.isPrivate('::FFFF:172.16.200.1'), true);
      assert.equal(ip.isPrivate('::ffff:192.168.0.1'), true);
    });

    it('should check if an address is from the internet', function() {
      assert.equal(ip.isPrivate('165.225.132.33'), false); // joyent.com
    });

    it('should check if an address is a loopback IPv6 address', function() {
      assert.equal(ip.isPrivate('::'), true);
      assert.equal(ip.isPrivate('::1'), true);
      assert.equal(ip.isPrivate('fe80::1'), true);
    });
  });

  describe('loopback() method', function() {
    describe('undefined', function() {
      it('should respond with 127.0.0.1', function() {
        assert.equal(ip.loopback(), '127.0.0.1')
      });
    });

    describe('ipv4', function() {
      it('should respond with 127.0.0.1', function() {
        assert.equal(ip.loopback('ipv4'), '127.0.0.1')
      });
    });

    describe('ipv6', function() {
      it('should respond with fe80::1', function() {
        assert.equal(ip.loopback('ipv6'), 'fe80::1')
      });
    });
  });

  describe('isLoopback() method', function() {
    describe('127.0.0.1', function() {
      it('should respond with true', function() {
        assert.ok(ip.isLoopback('127.0.0.1'))
      });
    });

    describe('127.8.8.8', function () {
      it('should respond with true', function () {
        assert.ok(ip.isLoopback('127.8.8.8'))
      });
    });

    describe('8.8.8.8', function () {
      it('should respond with false', function () {
        assert.equal(ip.isLoopback('8.8.8.8'), false);
      });
    });

    describe('fe80::1', function() {
      it('should respond with true', function() {
        assert.ok(ip.isLoopback('fe80::1'))
      });
    });

    describe('::1', function() {
      it('should respond with true', function() {
        assert.ok(ip.isLoopback('::1'))
      });
    });

    describe('::', function() {
      it('should respond with true', function() {
        assert.ok(ip.isLoopback('::'))
      });
    });
  });

  describe('address() method', function() {
    describe('undefined', function() {
      it('should respond with a private ip', function() {
        assert.ok(ip.isPrivate(ip.address()));
      });
    });

    describe('private', function() {
      [ undefined, 'ipv4', 'ipv6' ].forEach(function(family) {
        describe(family, function() {
          it('should respond with a private ip', function() {
            assert.ok(ip.isPrivate(ip.address('private', family)));
          });
        });
      });
    });

    var interfaces = os.networkInterfaces();

    Object.keys(interfaces).forEach(function(nic) {
      describe(nic, function() {
        [ undefined, 'ipv4' ].forEach(function(family) {
          describe(family, function() {
            it('should respond with an ipv4 address', function() {
              var addr = ip.address(nic, family);
              assert.ok(!addr || net.isIPv4(addr));
            });
          });
        });

        describe('ipv6', function() {
          it('should respond with an ipv6 address', function() {
            var addr = ip.address(nic, 'ipv6');
            assert.ok(!addr || net.isIPv6(addr));
          });
        })
      });
    });
  });

  describe('toLong() method', function() {
    it('should respond with a int', function() {
      assert.equal(ip.toLong('127.0.0.1'), 2130706433);
      assert.equal(ip.toLong('255.255.255.255'), 4294967295);
    });
  });

  describe('fromLong() method', function() {
    it('should repond with ipv4 address', function() {
      assert.equal(ip.fromLong(2130706433), '127.0.0.1');
      assert.equal(ip.fromLong(4294967295), '255.255.255.255');
    });
  })
});
