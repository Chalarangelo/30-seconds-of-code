"use strict";

const initTracer = require(`jaeger-client`).initTracer;

let tracer;

function create() {
  // See schema
  // https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js#L37
  var config = {
    serviceName: `gatsby`,
    reporter: {
      // Provide the traces endpoint; this forces the client to
      // connect directly to the Collector and send spans over HTTP
      collectorEndpoint: `http://localhost:14268/api/traces`
    },
    sampler: {
      type: `const`,
      param: 1
    }
  };
  var options = {};
  tracer = initTracer(config, options);
  return tracer;
}

function stop() {
  return new Promise(resolve => {
    tracer.close(resolve);
  });
}

module.exports = {
  create,
  stop
};
//# sourceMappingURL=jaeger-local.js.map