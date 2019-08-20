import * as log from '..';

log.setLevel('warn');
log.warn('Test warning');

// CoreJS defines a global `log` variable. We need to make sure that
// that doesn't conflict with the loglevel typings:
import * as _coreJS from 'core-js';
