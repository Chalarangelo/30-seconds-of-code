var PostgresAdapter = require('../../lib/stores/PostgresAdapter');

function MockPostgresAdapter(opts) {
  opts.verbose = false;
  opts.username = 'diamond';
  opts.dbname = 'diamond';
  PostgresAdapter.call(this, opts);
}

MockPostgresAdapter.prototype = Object.create(PostgresAdapter.prototype);

module.exports = MockPostgresAdapter;
