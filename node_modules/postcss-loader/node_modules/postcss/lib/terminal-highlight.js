'use strict';

exports.__esModule = true;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIGHLIGHT_THEME = {
    'brackets': _chalk2.default.cyan,
    'at-word': _chalk2.default.cyan,
    'call': _chalk2.default.cyan,
    'comment': _chalk2.default.gray,
    'string': _chalk2.default.green,
    'class': _chalk2.default.yellow,
    'hash': _chalk2.default.magenta,
    '(': _chalk2.default.cyan,
    ')': _chalk2.default.cyan,
    '{': _chalk2.default.yellow,
    '}': _chalk2.default.yellow,
    '[': _chalk2.default.yellow,
    ']': _chalk2.default.yellow,
    ':': _chalk2.default.yellow,
    ';': _chalk2.default.yellow
};

function getTokenType(_ref, processor) {
    var type = _ref[0],
        value = _ref[1];

    if (type === 'word') {
        if (value[0] === '.') {
            return 'class';
        }
        if (value[0] === '#') {
            return 'hash';
        }
    }

    if (!processor.endOfFile()) {
        var next = processor.nextToken();
        processor.back(next);
        if (next[0] === 'brackets' || next[0] === '(') return 'call';
    }

    return type;
}

function terminalHighlight(css) {
    var processor = (0, _tokenize2.default)(new _input2.default(css), { ignoreErrors: true });
    var result = '';

    var _loop = function _loop() {
        var token = processor.nextToken();
        var color = HIGHLIGHT_THEME[getTokenType(token, processor)];
        if (color) {
            result += token[1].split(/\r?\n/).map(function (i) {
                return color(i);
            }).join('\n');
        } else {
            result += token[1];
        }
    };

    while (!processor.endOfFile()) {
        _loop();
    }
    return result;
}

exports.default = terminalHighlight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1pbmFsLWhpZ2hsaWdodC5lczYiXSwibmFtZXMiOlsiSElHSExJR0hUX1RIRU1FIiwiY2hhbGsiLCJjeWFuIiwiZ3JheSIsImdyZWVuIiwieWVsbG93IiwibWFnZW50YSIsImdldFRva2VuVHlwZSIsInByb2Nlc3NvciIsInR5cGUiLCJ2YWx1ZSIsImVuZE9mRmlsZSIsIm5leHQiLCJuZXh0VG9rZW4iLCJiYWNrIiwidGVybWluYWxIaWdobGlnaHQiLCJjc3MiLCJJbnB1dCIsImlnbm9yZUVycm9ycyIsInJlc3VsdCIsInRva2VuIiwiY29sb3IiLCJzcGxpdCIsIm1hcCIsImkiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0I7QUFDcEIsZ0JBQVlDLGdCQUFNQyxJQURFO0FBRXBCLGVBQVlELGdCQUFNQyxJQUZFO0FBR3BCLFlBQVlELGdCQUFNQyxJQUhFO0FBSXBCLGVBQVlELGdCQUFNRSxJQUpFO0FBS3BCLGNBQVlGLGdCQUFNRyxLQUxFO0FBTXBCLGFBQVlILGdCQUFNSSxNQU5FO0FBT3BCLFlBQVlKLGdCQUFNSyxPQVBFO0FBUXBCLFNBQVlMLGdCQUFNQyxJQVJFO0FBU3BCLFNBQVlELGdCQUFNQyxJQVRFO0FBVXBCLFNBQVlELGdCQUFNSSxNQVZFO0FBV3BCLFNBQVlKLGdCQUFNSSxNQVhFO0FBWXBCLFNBQVlKLGdCQUFNSSxNQVpFO0FBYXBCLFNBQVlKLGdCQUFNSSxNQWJFO0FBY3BCLFNBQVlKLGdCQUFNSSxNQWRFO0FBZXBCLFNBQVlKLGdCQUFNSTtBQWZFLENBQXhCOztBQWtCQSxTQUFTRSxZQUFULE9BQXFDQyxTQUFyQyxFQUFnRDtBQUFBLFFBQXpCQyxJQUF5QjtBQUFBLFFBQW5CQyxLQUFtQjs7QUFDNUMsUUFBS0QsU0FBUyxNQUFkLEVBQXVCO0FBQ25CLFlBQUtDLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLG1CQUFPLE9BQVA7QUFDSDtBQUNELFlBQUtBLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLG1CQUFPLE1BQVA7QUFDSDtBQUNKOztBQUVELFFBQUssQ0FBQ0YsVUFBVUcsU0FBVixFQUFOLEVBQThCO0FBQzFCLFlBQUlDLE9BQU9KLFVBQVVLLFNBQVYsRUFBWDtBQUNBTCxrQkFBVU0sSUFBVixDQUFlRixJQUFmO0FBQ0EsWUFBS0EsS0FBSyxDQUFMLE1BQVksVUFBWixJQUEwQkEsS0FBSyxDQUFMLE1BQVksR0FBM0MsRUFBaUQsT0FBTyxNQUFQO0FBQ3BEOztBQUVELFdBQU9ILElBQVA7QUFDSDs7QUFFRCxTQUFTTSxpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUIsUUFBSVIsWUFBWSx3QkFBVSxJQUFJUyxlQUFKLENBQVVELEdBQVYsQ0FBVixFQUEwQixFQUFFRSxjQUFjLElBQWhCLEVBQTFCLENBQWhCO0FBQ0EsUUFBSUMsU0FBUyxFQUFiOztBQUY0QjtBQUl4QixZQUFJQyxRQUFRWixVQUFVSyxTQUFWLEVBQVo7QUFDQSxZQUFJUSxRQUFRckIsZ0JBQWdCTyxhQUFhYSxLQUFiLEVBQW9CWixTQUFwQixDQUFoQixDQUFaO0FBQ0EsWUFBS2EsS0FBTCxFQUFhO0FBQ1RGLHNCQUFVQyxNQUFNLENBQU4sRUFBU0UsS0FBVCxDQUFlLE9BQWYsRUFDTEMsR0FESyxDQUNBO0FBQUEsdUJBQUtGLE1BQU1HLENBQU4sQ0FBTDtBQUFBLGFBREEsRUFFTEMsSUFGSyxDQUVBLElBRkEsQ0FBVjtBQUdILFNBSkQsTUFJTztBQUNITixzQkFBVUMsTUFBTSxDQUFOLENBQVY7QUFDSDtBQVp1Qjs7QUFHNUIsV0FBUSxDQUFDWixVQUFVRyxTQUFWLEVBQVQsRUFBaUM7QUFBQTtBQVVoQztBQUNELFdBQU9RLE1BQVA7QUFDSDs7a0JBRWNKLGlCIiwiZmlsZSI6InRlcm1pbmFsLWhpZ2hsaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5cbmltcG9ydCB0b2tlbml6ZXIgZnJvbSAnLi90b2tlbml6ZSc7XG5pbXBvcnQgSW5wdXQgICAgZnJvbSAnLi9pbnB1dCc7XG5cbmNvbnN0IEhJR0hMSUdIVF9USEVNRSA9IHtcbiAgICAnYnJhY2tldHMnOiBjaGFsay5jeWFuLFxuICAgICdhdC13b3JkJzogIGNoYWxrLmN5YW4sXG4gICAgJ2NhbGwnOiAgICAgY2hhbGsuY3lhbixcbiAgICAnY29tbWVudCc6ICBjaGFsay5ncmF5LFxuICAgICdzdHJpbmcnOiAgIGNoYWxrLmdyZWVuLFxuICAgICdjbGFzcyc6ICAgIGNoYWxrLnllbGxvdyxcbiAgICAnaGFzaCc6ICAgICBjaGFsay5tYWdlbnRhLFxuICAgICcoJzogICAgICAgIGNoYWxrLmN5YW4sXG4gICAgJyknOiAgICAgICAgY2hhbGsuY3lhbixcbiAgICAneyc6ICAgICAgICBjaGFsay55ZWxsb3csXG4gICAgJ30nOiAgICAgICAgY2hhbGsueWVsbG93LFxuICAgICdbJzogICAgICAgIGNoYWxrLnllbGxvdyxcbiAgICAnXSc6ICAgICAgICBjaGFsay55ZWxsb3csXG4gICAgJzonOiAgICAgICAgY2hhbGsueWVsbG93LFxuICAgICc7JzogICAgICAgIGNoYWxrLnllbGxvd1xufTtcblxuZnVuY3Rpb24gZ2V0VG9rZW5UeXBlKFt0eXBlLCB2YWx1ZV0sIHByb2Nlc3Nvcikge1xuICAgIGlmICggdHlwZSA9PT0gJ3dvcmQnICkge1xuICAgICAgICBpZiAoIHZhbHVlWzBdID09PSAnLicgKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NsYXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbHVlWzBdID09PSAnIycgKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2hhc2gnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCAhcHJvY2Vzc29yLmVuZE9mRmlsZSgpICkge1xuICAgICAgICBsZXQgbmV4dCA9IHByb2Nlc3Nvci5uZXh0VG9rZW4oKTtcbiAgICAgICAgcHJvY2Vzc29yLmJhY2sobmV4dCk7XG4gICAgICAgIGlmICggbmV4dFswXSA9PT0gJ2JyYWNrZXRzJyB8fCBuZXh0WzBdID09PSAnKCcgKSByZXR1cm4gJ2NhbGwnO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiB0ZXJtaW5hbEhpZ2hsaWdodChjc3MpIHtcbiAgICBsZXQgcHJvY2Vzc29yID0gdG9rZW5pemVyKG5ldyBJbnB1dChjc3MpLCB7IGlnbm9yZUVycm9yczogdHJ1ZSB9KTtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgd2hpbGUgKCAhcHJvY2Vzc29yLmVuZE9mRmlsZSgpICkge1xuICAgICAgICBsZXQgdG9rZW4gPSBwcm9jZXNzb3IubmV4dFRva2VuKCk7XG4gICAgICAgIGxldCBjb2xvciA9IEhJR0hMSUdIVF9USEVNRVtnZXRUb2tlblR5cGUodG9rZW4sIHByb2Nlc3NvcildO1xuICAgICAgICBpZiAoIGNvbG9yICkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRva2VuWzFdLnNwbGl0KC9cXHI/XFxuLylcbiAgICAgICAgICAgICAgICAubWFwKCBpID0+IGNvbG9yKGkpIClcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gdG9rZW5bMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybWluYWxIaWdobGlnaHQ7XG4iXX0=
