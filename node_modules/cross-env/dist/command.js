'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isWindows = require('is-windows');

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = commandConvert;

/**
 * Converts an environment variable usage to be appropriate for the current OS
 * @param {String} command Command to convert
 * @param {Object} env Map of the current environment variable names and their values
 * @param {boolean} normalize If the command should be normalized using `path`
 * after converting
 * @returns {String} Converted command
 */

function commandConvert(command, env) {
  var normalize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!(0, _isWindows2.default)()) {
    return command;
  }
  var envUnixRegex = /\$(\w+)|\${(\w+)}/g; // $my_var or ${my_var}
  var convertedCmd = command.replace(envUnixRegex, function (match, $1, $2) {
    var varName = $1 || $2;
    // In Windows, non-existent variables are not replaced by the shell,
    // so for example "echo %FOO%" will literally print the string "%FOO%", as
    // opposed to printing an empty string in UNIX. See kentcdodds/cross-env#145
    // If the env variable isn't defined at runtime, just strip it from the command entirely
    return env[varName] ? `%${varName}%` : '';
  });
  // Normalization is required for commands with relative paths
  // For example, `./cmd.bat`. See kentcdodds/cross-env#127
  // However, it should not be done for command arguments.
  // See https://github.com/kentcdodds/cross-env/pull/130#issuecomment-319887970
  return normalize === true ? _path2.default.normalize(convertedCmd) : convertedCmd;
}