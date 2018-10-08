const expect = require("expect");
const getImages = require("./getImages.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const TEST_HTML = new JSDOM("<!DOCTYPE html><p>Hello world</p><img src=\"https://upload.wikimedia.org/wikipedia/en/1/12/Yellow_Smiley_Face.png\"></img>").window.document;

test("getImages is a Function", () => {
    expect(getImages).toBeInstanceOf(Function);
});

test("getImages returns an Array", () => {
    expect(getImages(TEST_HTML)).toBeInstanceOf(Array);
});

test("getImages removes duplicates from images Array", () => {
    expect(getImages(TEST_HTML, false).length).toBeLessThanOrEqual(getImages(TEST_HTML, true).length);
    expect(getImages(TEST_HTML, true)).toEqual(expect.arrayContaining(getImages(TEST_HTML, false)));
});\n
