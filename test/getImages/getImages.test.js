const expect = require('expect');
const getImages = require('./getImages.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

test('getImages is a Function', () => {
  expect(getImages).toBeInstanceOf(Function);
});

test('getImages returns an Array', () => {
  expect(getImages(new JSDOM(`<!DOCTYPE html><p>Hello world</p><img src="https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png"></img>`)
    .window.document))
    .toBeInstanceOf(Array);
});