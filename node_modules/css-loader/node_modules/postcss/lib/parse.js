'use strict';

exports.__esModule = true;
exports.default = parse;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(css, opts) {
    if (opts && opts.safe) {
        throw new Error('Option safe was removed. ' + 'Use parser: require("postcss-safe-parser")');
    }

    var input = new _input2.default(css, opts);
    var parser = new _parser2.default(input);
    try {
        parser.parse();
    } catch (e) {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
                e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
            } else if (/\.sass/i.test(opts.from)) {
                e.message += '\nYou tried to parse Sass with ' + 'the standard CSS parser; ' + 'try again with the postcss-sass parser';
            } else if (/\.less$/i.test(opts.from)) {
                e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
            }
        }
        throw e;
    }

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsImNzcyIsIm9wdHMiLCJzYWZlIiwiRXJyb3IiLCJpbnB1dCIsIklucHV0IiwicGFyc2VyIiwiUGFyc2VyIiwiZSIsIm5hbWUiLCJmcm9tIiwidGVzdCIsIm1lc3NhZ2UiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7a0JBR3dCQSxLOztBQUh4Qjs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxLQUFULENBQWVDLEdBQWYsRUFBb0JDLElBQXBCLEVBQTBCO0FBQ3JDLFFBQUtBLFFBQVFBLEtBQUtDLElBQWxCLEVBQXlCO0FBQ3JCLGNBQU0sSUFBSUMsS0FBSixDQUFVLDhCQUNBLDRDQURWLENBQU47QUFFSDs7QUFFRCxRQUFJQyxRQUFRLElBQUlDLGVBQUosQ0FBVUwsR0FBVixFQUFlQyxJQUFmLENBQVo7QUFDQSxRQUFJSyxTQUFTLElBQUlDLGdCQUFKLENBQVdILEtBQVgsQ0FBYjtBQUNBLFFBQUk7QUFDQUUsZUFBT1AsS0FBUDtBQUNILEtBRkQsQ0FFRSxPQUFPUyxDQUFQLEVBQVU7QUFDUixZQUFLQSxFQUFFQyxJQUFGLEtBQVcsZ0JBQVgsSUFBK0JSLElBQS9CLElBQXVDQSxLQUFLUyxJQUFqRCxFQUF3RDtBQUNwRCxnQkFBSyxXQUFXQyxJQUFYLENBQWdCVixLQUFLUyxJQUFyQixDQUFMLEVBQWtDO0FBQzlCRixrQkFBRUksT0FBRixJQUFhLG9DQUNBLDJCQURBLEdBRUEsd0NBRmI7QUFHSCxhQUpELE1BSU8sSUFBSyxVQUFVRCxJQUFWLENBQWVWLEtBQUtTLElBQXBCLENBQUwsRUFBaUM7QUFDcENGLGtCQUFFSSxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdILGFBSk0sTUFJQSxJQUFLLFdBQVdELElBQVgsQ0FBZ0JWLEtBQUtTLElBQXJCLENBQUwsRUFBa0M7QUFDckNGLGtCQUFFSSxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdIO0FBQ0o7QUFDRCxjQUFNSixDQUFOO0FBQ0g7O0FBRUQsV0FBT0YsT0FBT08sSUFBZDtBQUNIIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQgSW5wdXQgIGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShjc3MsIG9wdHMpIHtcbiAgICBpZiAoIG9wdHMgJiYgb3B0cy5zYWZlICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBzYWZlIHdhcyByZW1vdmVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdVc2UgcGFyc2VyOiByZXF1aXJlKFwicG9zdGNzcy1zYWZlLXBhcnNlclwiKScpO1xuICAgIH1cblxuICAgIGxldCBpbnB1dCA9IG5ldyBJbnB1dChjc3MsIG9wdHMpO1xuICAgIGxldCBwYXJzZXIgPSBuZXcgUGFyc2VyKGlucHV0KTtcbiAgICB0cnkge1xuICAgICAgICBwYXJzZXIucGFyc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICggZS5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmIG9wdHMgJiYgb3B0cy5mcm9tICkge1xuICAgICAgICAgICAgaWYgKCAvXFwuc2NzcyQvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU0NTUyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2NzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLnNhc3MvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pICkge1xuICAgICAgICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIExlc3Mgd2l0aCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLWxlc3MgcGFyc2VyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZXIucm9vdDtcbn1cbiJdfQ==
