var ProxyServer = require('../spec/proxy_server');

var port   = process.argv[2],
    secure = process.argv[3] === 'tls',
    proxy  = new ProxyServer({debug: true, tls: secure});

proxy.listen(port);
