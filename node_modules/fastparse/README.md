# fastparse

A very simple and stupid parser, based on a statemachine and regular expressions.

It's not intended for complex languages. It's intended to easily write a simple parser for a simple language.



## Usage

Pass a description of statemachine to the constructor. The description must be in this form:

``` javascript
new Parser(description)

description is {
	// The key is the name of the state
	// The value is an object containing possible transitions
	"state-name": {
		// The key is a regular expression
		// If the regular expression matches the transition is executed
		// The value can be "true", a other state name or a function

		"a": true,
		// true will make the parser stay in the current state
		
		"b": "other-state-name",
		// a string will make the parser transit to a new state
		
		"[cde]": function(match, index, matchLength) {
			// "match" will be the matched string
			// "index" will be the position in the complete string
			// "matchLength" will be "match.length"
			
			// "this" will be the "context" passed to the "parse" method"
			
			// A new state name (string) can be returned
			return "other-state-name";
		},
		
		"([0-9]+)(\\.[0-9]+)?": function(match, first, second, index, matchLength) {
			// groups can be used in the regular expression
			// they will match to arguments "first", "second"
		},
		
		// the parser stops when it cannot match the string anymore
		
		// order of keys is the order in which regular expressions are matched
		// if the javascript runtime preserves the order of keys in an object
		// (this is not standardized, but it's a de-facto standard)
	}
}
```

The statemachine is compiled down to a single regular expression per state. So basically the parsing work is delegated to the (native) regular expression logic of the javascript runtime.


``` javascript
Parser.prototype.parse(initialState: String, parsedString: String, context: Object)
```

`initialState`: state where the parser starts to parse.

`parsedString`: the string which should be parsed.

`context`: an object which can be used to save state and results. Available as `this` in transition functions.

returns `context`




## Example

``` javascript
var Parser = require("fastparse");

// A simple parser that extracts @licence ... from comments in a JS file
var parser = new Parser({
	// The "source" state
	"source": {
		// matches comment start
		"/\\*": "comment",
		"//": "linecomment",
		
		// this would be necessary for a complex language like JS
		// but omitted here for simplicity
		// "\"": "string1",
		// "\'": "string2",
		// "\/": "regexp"
		
	},
	// The "comment" state
	"comment": {
		"\\*/": "source",
		"@licen[cs]e\\s((?:[^*\n]|\\*+[^*/\n])*)": function(match, licenseText) {
			this.licences.push(licenseText.trim());
		}
	},
	// The "linecomment" state
	"linecomment": {
		"\n": "source",
		"@licen[cs]e\\s(.*)": function(match, licenseText) {
			this.licences.push(licenseText.trim());
		}
	}
});

var licences = parser.parse("source", sourceCode, { licences: [] }).licences;

console.log(licences);
```



## License

MIT (http://www.opensource.org/licenses/mit-license.php)
