// parse emojifile.js and output emoji.json
var fs = require('fs'),
    path = require('path'),
    emoji = require('./emojifile').data;

// parse
var parsed_emoji = {};

for (var key in emoji) {
  if (emoji.hasOwnProperty(key)) {
    var names = emoji[key][3];
    names = names.constructor === Array ? names : [names];
    var emoji_char = emoji[key][0][0];
    for (var name of names) {
      parsed_emoji[name] = emoji_char;
    }
  }
}

// write to emoji.json
fs.writeFile(path.join(__dirname, 'emoji.json'), JSON.stringify(parsed_emoji), function(err) {
  if(err) {
    console.error('Error:', err);
  } else {
    console.log('Done.');
  }
});
