// const test = require('tape');
// //const arrayToHtmlList = require('./arrayToHtmlList.js');
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const listID = 'myListID';
// const dom = new JSDOM(`<ul id="${listID}"></ul>`);
// // Override snippet to use jsdom
// const arrayToHtmlList = (arr, listID) =>
// arr.map(item => (dom.window.document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));
//
// test('Testing arrayToHtmlList', (t) => {
//   //For more information on all the methods supported by tape
//   //Please go to https://github.com/substack/tape
//   t.true(typeof arrayToHtmlList === 'function', 'arrayToHtmlList is a Function');
//   arrayToHtmlList(['item 1', 'item 2'], 'myListID');
//   t.equals(dom.window.document.querySelector(`ul#${listID}`).innerHTML, '<li>item 1</li><li>item 2</li>', 'Generates and fills a list element');
//   //t.deepEqual(arrayToHtmlList(args..), 'Expected');
//   //t.equal(arrayToHtmlList(args..), 'Expected');
//   //t.false(arrayToHtmlList(args..), 'Expected');
//   //t.throws(arrayToHtmlList(args..), 'Expected');
//   t.end();
// });
