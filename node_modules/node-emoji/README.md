# node-emoji

[![NPM version (1.0.3)](https://img.shields.io/npm/v/node-emoji.svg?style=flat-square)](https://www.npmjs.com/package/node-emoji) [![NPM Downloads](https://img.shields.io/npm/dm/node-emoji.svg?style=flat-square)](https://www.npmjs.com/package/node-emoji) [![Build Status](https://img.shields.io/travis/omnidan/node-emoji/master.svg?style=flat-square)](https://travis-ci.org/omnidan/node-emoji) [![Dependencies](https://img.shields.io/david/omnidan/node-emoji.svg?style=flat-square)](https://david-dm.org/omnidan/node-emoji) [![Code Climate](https://img.shields.io/codeclimate/github/omnidan/node-emoji.svg?style=flat-square)](https://codeclimate.com/github/omnidan/node-emoji) [![https://paypal.me/DanielBugl/9](https://img.shields.io/badge/donate-paypal-yellow.svg?style=flat-square)](https://paypal.me/DanielBugl/9)

_simple emoji support for node.js projects_

![node-emoji example](https://i.imgur.com/yIo5Uux.png)

**Help wanted:** We are looking for volunteers to maintain this project, if you are interested, feel free to contact me at [me@omnidan.net](mailto:me@omnidan.net)

## Installation
To install `node-emoji`, you need [node.js](http://nodejs.org/) and [npm](https://github.com/npm/npm#super-easy-install). :rocket:

Once you have that set-up, just run `npm install --save node-emoji` in your project directory. :ship:

You're now ready to use emoji in your node projects! Awesome! :metal:

## Usage
```javascript
var emoji = require('node-emoji')
emoji.get('coffee') // returns the emoji code for coffee (displays emoji on terminals that support it)
emoji.which(emoji.get('coffee')) // returns the string "coffee"
emoji.get(':fast_forward:') // `.get` also supports github flavored markdown emoji (http://www.emoji-cheat-sheet.com/)
emoji.emojify('I :heart: :coffee:!') // replaces all :emoji: with the actual emoji, in this case: returns "I ❤️ ☕️!"
emoji.random() // returns a random emoji + key, e.g. `{ emoji: '❤️', key: 'heart' }`
emoji.search('cof') // returns an array of objects with matching emoji's. `[{ emoji: '☕️', key: 'coffee' }, { emoji: ⚰', key: 'coffin'}]`
emoji.unemojify('I ❤️ 🍕') // replaces the actual emoji with :emoji:, in this case: returns "I :heart: :pizza:"
emoji.find('🍕') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.find('pizza') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.hasEmoji('🍕') // Validate if this library knows an emoji like `🍕`
emoji.hasEmoji('pizza') // Validate if this library knowns a emoji with the name `pizza`
emoji.strip('⚠️ 〰️ 〰️ low disk space') // Strips the string from emoji's, in this case returns: "low disk space".
emoji.replace('⚠️ 〰️ 〰️ low disk space', (emoji) => `${emoji.key}:`) // Replace emoji's by callback method: "warning: low disk space"
```

## Options

### onMissing
`emoji.emojify(str, onMissing)`

As second argument, `emojify` takes an handler to parse unknown emojis. Provide a function to add your own handler:

```js
var onMissing = function (name) {
  return name;
});

var emojified = emoji.emojify('I :unknown_emoji: :star: :another_one:', onMissing);
// emojified: I unknown_emoji ⭐️ another_one
```

### format
`emoji.emojify(str, onMissing, format)`

As third argument, `emojify` takes an handler to wrap parsed emojis. Provide a function to place emojis in custom elements, and to apply your custom styling:

```js
var format = function (code, name) {
  return '<img alt="' + code + '" src="' + name + '.png" />';
});

var emojified = emoji.emojify('I :unknown_emoji: :star: :another_one:', null, format);
// emojified: I <img alt="❤️" src="heart.png" /> <img alt="☕️" src="coffee.png" />
```

## Adding new emoji
Emoji come from js-emoji (Thanks a lot :thumbsup:). You can get a JSON file with all emoji here: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json

To update the list or add custom emoji, clone this repository and put them into `lib/emojifile.js`.
Then run `npm run-script emojiparse` in the project directory or `node emojiparse` in the lib directory.
This should generate the new emoji.json file and output `Done.`.

That's all, you now have more emoji you can use! :clap:

## Support / Donations
If you want to support node-emoji development, please consider donating (it helps me keeping my projects active and alive!):

 * Paypal: [![daniel.bugl@gmail.com](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBMS9EKTNPZHJ)
 * Bitcoin: [1J5eKsrAcPPLv5gPxSjSUkXnbJpkhndFgA](bitcoin:1J5eKsrAcPPLv5gPxSjSUkXnbJpkhndFgA)
