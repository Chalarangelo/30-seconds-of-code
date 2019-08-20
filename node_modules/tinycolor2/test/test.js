
test("TinyColor initialization", function() {
  ok(typeof tinycolor != "undefined", "tinycolor is initialized on the page");
  ok(typeof tinycolor("red") == "object", "tinycolor is able to be instantiated");

  var r = tinycolor("red");
  ok(tinycolor(r) === r, "when given a tinycolor instance, tinycolor() returns it");
  ok(new tinycolor(r) === r, "when given a tinycolor instance, new tinycolor() returns it");
  equal(tinycolor("red", { format: "hex" }).toString(), "#ff0000", "tinycolor options are being parsed");
  equal(tinycolor.fromRatio({r: 1, g: 0, b: 0 }, { format: "hex" }).toString(), "#ff0000", "tinycolor options are being parsed");

  var obj = {h: 180, s: 0.5, l: 0.5};
  var color = tinycolor(obj);
  ok(obj.s === 0.5, "when given an object, the original object is not modified");
});

test("Original input", function() {
  var colorRgbUp   = "RGB(39, 39, 39)";
  var colorRgbLow  = "rgb(39, 39, 39)";
  var colorRgbMix  = "RgB(39, 39, 39)";
  var tinycolorObj = tinycolor(colorRgbMix);
  var inputObj = {r:100,g:100,b:100};
  var r = tinycolor("red");

  ok(tinycolor(colorRgbLow).getOriginalInput() === colorRgbLow, "original lowercase input is returned");
  ok(tinycolor(colorRgbUp).getOriginalInput() === colorRgbUp, "original uppercase input is returned");
  ok(tinycolor(colorRgbMix).getOriginalInput() === colorRgbMix, "original mixed input is returned");
  ok(tinycolor(tinycolorObj).getOriginalInput() === colorRgbMix, "when given a tinycolor instance, the color string is returned");
  ok(tinycolor(inputObj).getOriginalInput() === inputObj, "when given an object, the object is returned");
  ok(new tinycolor("").getOriginalInput() === "", "when given an empty string, an empty string is returned");
  ok(new tinycolor(null).getOriginalInput() === "", "when given a null value, an empty string is returned");
});

test("Cloning color", function() {
  var originalColor = tinycolor("red");
  var originalColorRgbString = originalColor.toRgbString();

  var clonedColor = originalColor.clone();
  ok(clonedColor.toRgbString() === originalColor.toRgbString(), "cloned color is identical");

  clonedColor.setAlpha(0.5);
  ok(clonedColor.toRgbString() !== originalColor.toRgbString(), "cloned color is changing independently from original color");
  ok(originalColorRgbString === originalColor.toRgbString(), "original color was not changed by cloned color change");
});

// Taken from convertWikipediaColors.html
var conversions = [
  {"hex":"#FFFFFF","hex8":"#FFFFFFFF","rgb":{"r":"100.0%","g":"100.0%","b":"100.0%"},"hsv":{"h":"0","s":"0.000","v":"1.000"},"hsl":{"h":"0","s":"0.000","l":"1.000"}},
  {"hex":"#808080","hex8":"#808080FF","rgb":{"r":"050.0%","g":"050.0%","b":"050.0%"},"hsv":{"h":"0","s":"0.000","v":"0.500"},"hsl":{"h":"0","s":"0.000","l":"0.500"}},
  {"hex":"#000000","hex8":"#000000FF","rgb":{"r":"000.0%","g":"000.0%","b":"000.0%"},"hsv":{"h":"0","s":"0.000","v":"0.000"},"hsl":{"h":"0","s":"0.000","l":"0.000"}},
  {"hex":"#FF0000","hex8":"#FF0000FF","rgb":{"r":"100.0%","g":"000.0%","b":"000.0%"},"hsv":{"h":"0.0","s":"1.000","v":"1.000"},"hsl":{"h":"0.0","s":"1.000","l":"0.500"}},
  {"hex":"#BFBF00","hex8":"#BFBF00FF","rgb":{"r":"075.0%","g":"075.0%","b":"000.0%"},"hsv":{"h":"60.0","s":"1.000","v":"0.750"},"hsl":{"h":"60.0","s":"1.000","l":"0.375"}},
  {"hex":"#008000","hex8":"#008000FF","rgb":{"r":"000.0%","g":"050.0%","b":"000.0%"},"hsv":{"h":"120.0","s":"1.000","v":"0.500"},"hsl":{"h":"120.0","s":"1.000","l":"0.250"}},
  {"hex":"#80FFFF","hex8":"#80FFFFFF","rgb":{"r":"050.0%","g":"100.0%","b":"100.0%"},"hsv":{"h":"180.0","s":"0.500","v":"1.000"},"hsl":{"h":"180.0","s":"1.000","l":"0.750"}},
  {"hex":"#8080FF","hex8":"#8080FFFF","rgb":{"r":"050.0%","g":"050.0%","b":"100.0%"},"hsv":{"h":"240.0","s":"0.500","v":"1.000"},"hsl":{"h":"240.0","s":"1.000","l":"0.750"}},
  {"hex":"#BF40BF","hex8":"#BF40BFFF","rgb":{"r":"075.0%","g":"025.0%","b":"075.0%"},"hsv":{"h":"300.0","s":"0.667","v":"0.750"},"hsl":{"h":"300.0","s":"0.500","l":"0.500"}},
  {"hex":"#A0A424","hex8":"#A0A424FF","rgb":{"r":"062.8%","g":"064.3%","b":"014.2%"},"hsv":{"h":"61.8","s":"0.779","v":"0.643"},"hsl":{"h":"61.8","s":"0.638","l":"0.393"}},
  {"hex":"#1EAC41","hex8":"#1EAC41FF","rgb":{"r":"011.6%","g":"067.5%","b":"025.5%"},"hsv":{"h":"134.9","s":"0.828","v":"0.675"},"hsl":{"h":"134.9","s":"0.707","l":"0.396"}},
  {"hex":"#B430E5","hex8":"#B430E5FF","rgb":{"r":"070.4%","g":"018.7%","b":"089.7%"},"hsv":{"h":"283.7","s":"0.792","v":"0.897"},"hsl":{"h":"283.7","s":"0.775","l":"0.542"}},
  {"hex":"#FEF888","hex8":"#FEF888FF","rgb":{"r":"099.8%","g":"097.4%","b":"053.2%"},"hsv":{"h":"56.9","s":"0.467","v":"0.998"},"hsl":{"h":"56.9","s":"0.991","l":"0.765"}},
  {"hex":"#19CB97","hex8":"#19CB97FF","rgb":{"r":"009.9%","g":"079.5%","b":"059.1%"},"hsv":{"h":"162.4","s":"0.875","v":"0.795"},"hsl":{"h":"162.4","s":"0.779","l":"0.447"}},
  {"hex":"#362698","hex8":"#362698FF","rgb":{"r":"021.1%","g":"014.9%","b":"059.7%"},"hsv":{"h":"248.3","s":"0.750","v":"0.597"},"hsl":{"h":"248.3","s":"0.601","l":"0.373"}},
  {"hex":"#7E7EB8","hex8":"#7E7EB8FF","rgb":{"r":"049.5%","g":"049.3%","b":"072.1%"},"hsv":{"h":"240.5","s":"0.316","v":"0.721"},"hsl":{"h":"240.5","s":"0.290","l":"0.607"}}
];

module("Color translations");

test("Color Equality", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);

    ok(true, tiny.isValid());
    ok(true,
      "Testing " + c.hex + ": " + tiny.toRgbString() + " " + tiny.toPercentageRgbString() + " " + tiny.toHsvString() + " " + tiny.toHslString() + " " + tiny.toHexString() +
      "Original: " + JSON.stringify(c.rgb) + " " + JSON.stringify(c.hsv) + " " + JSON.stringify(c.hsl)
    );
    ok(tinycolor.equals(c.rgb, c.hex), "RGB equals hex " + c.hex);
    ok(tinycolor.equals(c.rgb, c.hex8), "RGB equals hex " + c.hex);
    ok(tinycolor.equals(c.rgb, c.hsl), "RGB equals HSL " + c.hex);
    ok(tinycolor.equals(c.rgb, c.hsv), "RGB equals HSV " + c.hex);
    ok(tinycolor.equals(c.rgb, c.rgb), "RGB equals RGB " + c.hex);

    ok(tinycolor.equals(c.hex, c.hex), "hex equals hex " + c.hex);
    ok(tinycolor.equals(c.hex, c.hex8), "hex equals hex8 " + c.hex);
    ok(tinycolor.equals(c.hex, c.hsl), "hex equals HSL " + c.hex);
    ok(tinycolor.equals(c.hex, c.hsv), "hex equals HSV " + c.hex);

    ok(tinycolor.equals(c.hsl, c.hsv), "HSL equals HSV " + c.hex);
  }
});

module("Ratio Parsing");

test("With Ratio", function() {
  equal(tinycolor.fromRatio({r: 1, g: 1, b: 1}).toHexString(), "#ffffff", "white");
  equal(tinycolor.fromRatio({r: 1, g: 0, b: 0, a: .5 }).toRgbString(), "rgba(255, 0, 0, 0.5)", "alpha works when ratio is parsed");
  equal(tinycolor.fromRatio({r: 1, g: 0, b: 0, a: 1 }).toRgbString(), "rgb(255, 0, 0)", "alpha = 1 works when ratio is parsed");
  equal(tinycolor.fromRatio({r: 1, g: 0, b: 0, a: 10 }).toRgbString(), "rgb(255, 0, 0)", "alpha > 1 works when ratio is parsed");
  equal(tinycolor.fromRatio({r: 1, g: 0, b: 0, a: -1 }).toRgbString(), "rgb(255, 0, 0)", "alpha < 1 works when ratio is parsed");
});

test("Without Ratio", function() {
  equal(tinycolor({r: 1, g: 1, b: 1}).toHexString(), "#010101", "010101");
  equal(tinycolor({r: .1, g: .1, b: .1}).toHexString(), "#000000", "000000");
  equal(tinycolor("rgb .1 .1 .1").toHexString(), "#000000", "000000");
});

module("String Parsing");

test("RGB Text Parsing", function() {
  equal(tinycolor("rgb 255 0 0").toHexString(), "#ff0000", "spaced input");
  equal(tinycolor("rgb(255, 0, 0)").toHexString(), "#ff0000", "parenthesized input");
  equal(tinycolor("rgb (255, 0, 0)").toHexString(), "#ff0000", "parenthesized spaced input");
  equal(tinycolor({ r: 255, g: 0, b: 0 }).toHexString(), "#ff0000", "object input");
  deepEqual (tinycolor({ r: 255, g: 0, b: 0 }).toRgb(), { r: 255, g: 0, b: 0, a: 1 }, "object input and compare");


  ok(tinycolor.equals({r:200, g: 100, b: 0 }, "rgb(200, 100, 0)"));
  ok(tinycolor.equals({r:200, g: 100, b: 0 }, "rgb 200 100 0"));
  ok(tinycolor.equals({r:200, g: 100, b: 0 }, "rgb 200 100 0"));
  ok(tinycolor.equals({r:200, g: 100, b: 0, a: .4 }, "rgba 200 100 0 .4"));
  ok(!tinycolor.equals({r:199, g: 100, b: 0 }, "rgba 200 100 0 1"));

  ok(!tinycolor.equals({r:199, g: 100, b: 0 }, "rgb(200, 100, 0)"));
  ok(!tinycolor.equals({r:199, g: 100, b: 0 }, "rgb 200 100 0"));
  ok(!tinycolor.equals({r:199, g: 100, b: 0 }, "rgb 200 100 0"));


  ok(tinycolor.equals(tinycolor({r:200, g: 100, b: 0 }), "rgb(200, 100, 0)"));
  ok(tinycolor.equals(tinycolor({r:200, g: 100, b: 0 }), "rgb 200 100 0"));
  ok(tinycolor.equals(tinycolor({r:200, g: 100, b: 0 }), "rgb 200 100 0"));
});

test("Percentage RGB Text Parsing", function() {
  equal(tinycolor("rgb 100% 0% 0%").toHexString(), "#ff0000", "spaced input");
  equal(tinycolor("rgb(100%, 0%, 0%)").toHexString(), "#ff0000", "parenthesized input");
  equal(tinycolor("rgb (100%, 0%, 0%)").toHexString(), "#ff0000", "parenthesized spaced input");
  equal(tinycolor({ r: "100%", g: "0%", b: "0%" }).toHexString(), "#ff0000", "object input");
  deepEqual (tinycolor({ r: "100%", g: "0%", b: "0%" }).toRgb(), { r: 255, g: 0, b: 0, a: 1 }, "object input and compare");


  ok(tinycolor.equals({r:"90%", g: "45%", b: "0%" }, "rgb(90%, 45%, 0%)"));
  ok(tinycolor.equals({r:"90%", g: "45%", b: "0%" }, "rgb 90% 45% 0%"));
  ok(tinycolor.equals({r:"90%", g: "45%", b: "0%" }, "rgb 90% 45% 0%"));
  ok(tinycolor.equals({r:"90%", g: "45%", b: "0%", a: .4 }, "rgba 90% 45% 0% .4"));
  ok(!tinycolor.equals({r:"89%", g: "45%", b: "0%" }, "rgba 90% 45% 0% 1"));

  ok(!tinycolor.equals({r:"89%", g: "45%", b: "0%" }, "rgb(90%, 45%, 0%)"));
  ok(!tinycolor.equals({r:"89%", g: "45%", b: "0%" }, "rgb 90% 45% 0%"));
  ok(!tinycolor.equals({r:"89%", g: "45%", b: "0%" }, "rgb 90% 45% 0%"));


  ok(tinycolor.equals(tinycolor({r:"90%", g: "45%", b: "0%" }), "rgb(90%, 45%, 0%)"));
  ok(tinycolor.equals(tinycolor({r:"90%", g: "45%", b: "0%" }), "rgb 90% 45% 0%"));
  ok(tinycolor.equals(tinycolor({r:"90%", g: "45%", b: "0%" }), "rgb 90% 45% 0%"));
});

test("HSL parsing", function() {
  equal(tinycolor({ h: 251, s: 100, l: .38 }).toHexString(), "#2400c2", "to hex");
  equal(tinycolor({ h: 251, s: 100, l: .38 }).toRgbString(), "rgb(36, 0, 194)", "to rgb");
  equal(tinycolor({ h: 251, s: 100, l: .38 }).toHslString(), "hsl(251, 100%, 38%)", "to hsl");
  equal(tinycolor("hsl(251, 100, 38)").toHexString(), "#2400c2", "to hex");
  equal(tinycolor("hsl(251, 100%, 38%)").toRgbString(), "rgb(36, 0, 194)", "to rgb");
  equal(tinycolor("hsl(251, 100%, 38%)").toHslString(), "hsl(251, 100%, 38%)", "to hsl");
  equal(tinycolor("hsl 100 20 10").toHslString(), "hsl(100, 20%, 10%)", "problematic hsl");
});

test("Hex Parsing", function() {
  equal(tinycolor("rgb 255 0 0").toHexString(), "#ff0000");
  equal(tinycolor("rgb 255 0 0").toHexString(true), "#f00");

  equal(tinycolor("rgba 255 0 0 0.5").toHex8String(), "#ff000080");
  equal(tinycolor("rgba 255 0 0 0").toHex8String(), "#ff000000");
  equal(tinycolor("rgba 255 0 0 1").toHex8String(), "#ff0000ff");
  equal(tinycolor("rgba 255 0 0 1").toHex8String(true), "#f00f");

  equal(tinycolor("rgb 255 0 0").toHex(), "ff0000");
  equal(tinycolor("rgb 255 0 0").toHex(true), "f00");
  equal(tinycolor("rgba 255 0 0 0.5").toHex8(), "ff000080");
});

test("HSV Parsing", function() {
  equal(tinycolor("hsv 251.1 0.887 .918").toHsvString(), "hsv(251, 89%, 92%)");
  equal(tinycolor("hsv 251.1 0.887 0.918").toHsvString(), "hsv(251, 89%, 92%)");
  equal(tinycolor("hsva 251.1 0.887 0.918 0.5").toHsvString(), "hsva(251, 89%, 92%, 0.5)");
});

test("Invalid Parsing", function() {
  var invalidColor = tinycolor("this is not a color");
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor("#red");
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor("  #red");
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor("##123456");
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor("  ##123456");
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor({r: 'invalid', g: 'invalid', b: 'invalid' });
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor({h: 'invalid', s: 'invalid', l: 'invalid' });
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());

  invalidColor = tinycolor({h: 'invalid', s: 'invalid', v: 'invalid' });
  equal(invalidColor.toHexString(), "#000000");
  equal(false, invalidColor.isValid());
});

test("Named colors", function() {
  equal(tinycolor("aliceblue").toHex(), "f0f8ff");
  equal(tinycolor("antiquewhite").toHex(), "faebd7");
  equal(tinycolor("aqua").toHex(), "00ffff");
  equal(tinycolor("aquamarine").toHex(), "7fffd4");
  equal(tinycolor("azure").toHex(), "f0ffff");
  equal(tinycolor("beige").toHex(), "f5f5dc");
  equal(tinycolor("bisque").toHex(), "ffe4c4");
  equal(tinycolor("black").toHex(), "000000");
  equal(tinycolor("blanchedalmond").toHex(), "ffebcd");
  equal(tinycolor("blue").toHex(), "0000ff");
  equal(tinycolor("blueviolet").toHex(), "8a2be2");
  equal(tinycolor("brown").toHex(), "a52a2a");
  equal(tinycolor("burlywood").toHex(), "deb887");
  equal(tinycolor("cadetblue").toHex(), "5f9ea0");
  equal(tinycolor("chartreuse").toHex(), "7fff00");
  equal(tinycolor("chocolate").toHex(), "d2691e");
  equal(tinycolor("coral").toHex(), "ff7f50");
  equal(tinycolor("cornflowerblue").toHex(), "6495ed");
  equal(tinycolor("cornsilk").toHex(), "fff8dc");
  equal(tinycolor("crimson").toHex(), "dc143c");
  equal(tinycolor("cyan").toHex(), "00ffff");
  equal(tinycolor("darkblue").toHex(), "00008b");
  equal(tinycolor("darkcyan").toHex(), "008b8b");
  equal(tinycolor("darkgoldenrod").toHex(), "b8860b");
  equal(tinycolor("darkgray").toHex(), "a9a9a9");
  equal(tinycolor("darkgreen").toHex(), "006400");
  equal(tinycolor("darkkhaki").toHex(), "bdb76b");
  equal(tinycolor("darkmagenta").toHex(), "8b008b");
  equal(tinycolor("darkolivegreen").toHex(), "556b2f");
  equal(tinycolor("darkorange").toHex(), "ff8c00");
  equal(tinycolor("darkorchid").toHex(), "9932cc");
  equal(tinycolor("darkred").toHex(), "8b0000");
  equal(tinycolor("darksalmon").toHex(), "e9967a");
  equal(tinycolor("darkseagreen").toHex(), "8fbc8f");
  equal(tinycolor("darkslateblue").toHex(), "483d8b");
  equal(tinycolor("darkslategray").toHex(), "2f4f4f");
  equal(tinycolor("darkturquoise").toHex(), "00ced1");
  equal(tinycolor("darkviolet").toHex(), "9400d3");
  equal(tinycolor("deeppink").toHex(), "ff1493");
  equal(tinycolor("deepskyblue").toHex(), "00bfff");
  equal(tinycolor("dimgray").toHex(), "696969");
  equal(tinycolor("dodgerblue").toHex(), "1e90ff");
  equal(tinycolor("firebrick").toHex(), "b22222");
  equal(tinycolor("floralwhite").toHex(), "fffaf0");
  equal(tinycolor("forestgreen").toHex(), "228b22");
  equal(tinycolor("fuchsia").toHex(), "ff00ff");
  equal(tinycolor("gainsboro").toHex(), "dcdcdc");
  equal(tinycolor("ghostwhite").toHex(), "f8f8ff");
  equal(tinycolor("gold").toHex(), "ffd700");
  equal(tinycolor("goldenrod").toHex(), "daa520");
  equal(tinycolor("gray").toHex(), "808080");
  equal(tinycolor("grey").toHex(), "808080");
  equal(tinycolor("green").toHex(), "008000");
  equal(tinycolor("greenyellow").toHex(), "adff2f");
  equal(tinycolor("honeydew").toHex(), "f0fff0");
  equal(tinycolor("hotpink").toHex(), "ff69b4");
  equal(tinycolor("indianred ").toHex(), "cd5c5c");
  equal(tinycolor("indigo ").toHex(), "4b0082");
  equal(tinycolor("ivory").toHex(), "fffff0");
  equal(tinycolor("khaki").toHex(), "f0e68c");
  equal(tinycolor("lavender").toHex(), "e6e6fa");
  equal(tinycolor("lavenderblush").toHex(), "fff0f5");
  equal(tinycolor("lawngreen").toHex(), "7cfc00");
  equal(tinycolor("lemonchiffon").toHex(), "fffacd");
  equal(tinycolor("lightblue").toHex(), "add8e6");
  equal(tinycolor("lightcoral").toHex(), "f08080");
  equal(tinycolor("lightcyan").toHex(), "e0ffff");
  equal(tinycolor("lightgoldenrodyellow").toHex(), "fafad2");
  equal(tinycolor("lightgrey").toHex(), "d3d3d3");
  equal(tinycolor("lightgreen").toHex(), "90ee90");
  equal(tinycolor("lightpink").toHex(), "ffb6c1");
  equal(tinycolor("lightsalmon").toHex(), "ffa07a");
  equal(tinycolor("lightseagreen").toHex(), "20b2aa");
  equal(tinycolor("lightskyblue").toHex(), "87cefa");
  equal(tinycolor("lightslategray").toHex(), "778899");
  equal(tinycolor("lightsteelblue").toHex(), "b0c4de");
  equal(tinycolor("lightyellow").toHex(), "ffffe0");
  equal(tinycolor("lime").toHex(), "00ff00");
  equal(tinycolor("limegreen").toHex(), "32cd32");
  equal(tinycolor("linen").toHex(), "faf0e6");
  equal(tinycolor("magenta").toHex(), "ff00ff");
  equal(tinycolor("maroon").toHex(), "800000");
  equal(tinycolor("mediumaquamarine").toHex(), "66cdaa");
  equal(tinycolor("mediumblue").toHex(), "0000cd");
  equal(tinycolor("mediumorchid").toHex(), "ba55d3");
  equal(tinycolor("mediumpurple").toHex(), "9370db");
  equal(tinycolor("mediumseagreen").toHex(), "3cb371");
  equal(tinycolor("mediumslateblue").toHex(), "7b68ee");
  equal(tinycolor("mediumspringgreen").toHex(), "00fa9a");
  equal(tinycolor("mediumturquoise").toHex(), "48d1cc");
  equal(tinycolor("mediumvioletred").toHex(), "c71585");
  equal(tinycolor("midnightblue").toHex(), "191970");
  equal(tinycolor("mintcream").toHex(), "f5fffa");
  equal(tinycolor("mistyrose").toHex(), "ffe4e1");
  equal(tinycolor("moccasin").toHex(), "ffe4b5");
  equal(tinycolor("navajowhite").toHex(), "ffdead");
  equal(tinycolor("navy").toHex(), "000080");
  equal(tinycolor("oldlace").toHex(), "fdf5e6");
  equal(tinycolor("olive").toHex(), "808000");
  equal(tinycolor("olivedrab").toHex(), "6b8e23");
  equal(tinycolor("orange").toHex(), "ffa500");
  equal(tinycolor("orangered").toHex(), "ff4500");
  equal(tinycolor("orchid").toHex(), "da70d6");
  equal(tinycolor("palegoldenrod").toHex(), "eee8aa");
  equal(tinycolor("palegreen").toHex(), "98fb98");
  equal(tinycolor("paleturquoise").toHex(), "afeeee");
  equal(tinycolor("palevioletred").toHex(), "db7093");
  equal(tinycolor("papayawhip").toHex(), "ffefd5");
  equal(tinycolor("peachpuff").toHex(), "ffdab9");
  equal(tinycolor("peru").toHex(), "cd853f");
  equal(tinycolor("pink").toHex(), "ffc0cb");
  equal(tinycolor("plum").toHex(), "dda0dd");
  equal(tinycolor("powderblue").toHex(), "b0e0e6");
  equal(tinycolor("purple").toHex(), "800080");
  equal(tinycolor("rebeccapurple").toHex(), "663399");
  equal(tinycolor("red").toHex(), "ff0000");
  equal(tinycolor("rosybrown").toHex(), "bc8f8f");
  equal(tinycolor("royalblue").toHex(), "4169e1");
  equal(tinycolor("saddlebrown").toHex(), "8b4513");
  equal(tinycolor("salmon").toHex(), "fa8072");
  equal(tinycolor("sandybrown").toHex(), "f4a460");
  equal(tinycolor("seagreen").toHex(), "2e8b57");
  equal(tinycolor("seashell").toHex(), "fff5ee");
  equal(tinycolor("sienna").toHex(), "a0522d");
  equal(tinycolor("silver").toHex(), "c0c0c0");
  equal(tinycolor("skyblue").toHex(), "87ceeb");
  equal(tinycolor("slateblue").toHex(), "6a5acd");
  equal(tinycolor("slategray").toHex(), "708090");
  equal(tinycolor("snow").toHex(), "fffafa");
  equal(tinycolor("springgreen").toHex(), "00ff7f");
  equal(tinycolor("steelblue").toHex(), "4682b4");
  equal(tinycolor("tan").toHex(), "d2b48c");
  equal(tinycolor("teal").toHex(), "008080");
  equal(tinycolor("thistle").toHex(), "d8bfd8");
  equal(tinycolor("tomato").toHex(), "ff6347");
  equal(tinycolor("turquoise").toHex(), "40e0d0");
  equal(tinycolor("violet").toHex(), "ee82ee");
  equal(tinycolor("wheat").toHex(), "f5deb3");
  equal(tinycolor("white").toHex(), "ffffff");
  equal(tinycolor("whitesmoke").toHex(), "f5f5f5");
  equal(tinycolor("yellow").toHex(), "ffff00");
  equal(tinycolor("yellowgreen").toHex(), "9acd32");

  equal(tinycolor("#f00").toName(), "red");
  equal(tinycolor("#fa0a0a").toName(), false);
});

module("Alpha handling");

test("Invalid alpha should normalize to 1", function() {
  equal(tinycolor({r:255,g:20,b:10,a: -1}).toRgbString(), "rgb(255, 20, 10)", "Negative value");
  equal(tinycolor({r:255,g:20,b:10,a: -0}).toRgbString(), "rgba(255, 20, 10, 0)", "Negative 0");
  equal(tinycolor({r:255,g:20,b:10,a: 0}).toRgbString(), "rgba(255, 20, 10, 0)", "0");
  equal(tinycolor({r:255,g:20,b:10,a: .5}).toRgbString(), "rgba(255, 20, 10, 0.5)", ".5");
  equal(tinycolor({r:255,g:20,b:10,a: 1}).toRgbString(), "rgb(255, 20, 10)", "1");
  equal(tinycolor({r:255,g:20,b:10,a: 100}).toRgbString(), "rgb(255, 20, 10)", "Greater than 1");
  equal(tinycolor({r:255,g:20,b:10,a: "asdfasd"}).toRgbString(), "rgb(255, 20, 10)",  "Non Numeric");

  equal(tinycolor("#fff").toRgbString(), "rgb(255, 255, 255)",  "Hex should be 1");
  equal(tinycolor("rgba 255 0 0 100").toRgbString(), "rgb(255, 0, 0)",  "Greater than 1 in string parsing");
});

test("toString() with alpha set", function() {
  var redNamed = tinycolor.fromRatio({ r: 255, g: 0, b: 0, a: .6}, {format: "name"});
  var transparentNamed = tinycolor.fromRatio({ r: 255, g: 0, b: 0, a: 0 }, {format: "name"});
  var redHex = tinycolor.fromRatio({ r: 255, g: 0, b: 0, a: .4}, {format: "hex"});

  equal(redNamed.getFormat(), "name", "getFormat() is correct");
  equal(redHex.getFormat(), "hex", "getFormat() is correct");

  equal(redNamed.toString(), "rgba(255, 0, 0, 0.6)", "Names should default to rgba if alpha is < 1");
  equal(redHex.toString(), "rgba(255, 0, 0, 0.4)", "Hex should default to rgba if alpha is < 1");

  equal(redNamed.toString("hex"), "#ff0000", "Names should not be returned as rgba if format is specified");
  equal(redNamed.toString("hex6"), "#ff0000", "Names should not be returned as rgba if format is specified");
  equal(redNamed.toString("hex3"), "#f00", "Names should not be returned as rgba if format is specified");
  equal(redNamed.toString("hex8"), "#ff000099", "Names should not be returned as rgba if format is specified");
  equal(redNamed.toString("hex4"), "#f009", "Names should not be returned as rgba if format is specified");
  equal(redNamed.toString("name"), "#ff0000", "Semi transparent names should return hex in toString() if name format is specified");

  equal(redNamed.toName(), false, "Semi transparent names should be false in toName()");

  equal(redHex.toString(), "rgba(255, 0, 0, 0.4)", "Hex should default to rgba if alpha is < 1");
  equal(transparentNamed.toString(), "transparent", "Named color should equal transparent if alpha == 0");

  redHex.setAlpha(0);
  equal(redHex.toString(), "rgba(255, 0, 0, 0)", "Hex should default to rgba if alpha is = 0");
});

test("setting alpha", function() {
  var hexSetter = tinycolor("rgba(255, 0, 0, 1)");
  equal(hexSetter.getAlpha(), 1, "Alpha should start as 1");
  var returnedFromSetAlpha = hexSetter.setAlpha(.9);
  equal(returnedFromSetAlpha, hexSetter, "setAlpha return value should be the color.");
  equal(hexSetter.getAlpha(), .9, "setAlpha should change alpha value");
  hexSetter.setAlpha(.5);
  equal(hexSetter.getAlpha(), .5, "setAlpha should change alpha value");
  hexSetter.setAlpha(0);
  equal(hexSetter.getAlpha(), 0, "setAlpha should change alpha value");
  hexSetter.setAlpha(-1);
  equal(hexSetter.getAlpha(), 1, "setAlpha with value < 0 should be bound to 1");
  hexSetter.setAlpha(2);
  equal(hexSetter.getAlpha(), 1, "setAlpha with value > 1 should be bound to 1");
  hexSetter.setAlpha();
  equal(hexSetter.getAlpha(), 1, "setAlpha with invalid value should be bound to 1");
  hexSetter.setAlpha(null);
  equal(hexSetter.getAlpha(), 1, "setAlpha with invalid value should be bound to 1");
  hexSetter.setAlpha("test");
  equal(hexSetter.getAlpha(), 1, "setAlpha with invalid value should be bound to 1");
});

test("Alpha = 0 should act differently on toName()", function() {
  equal(tinycolor({r:255,g:20,b:10,a: 0}).toName(), "transparent", "0");
  equal(tinycolor("transparent").toString(), "transparent", "toString when passed");
  equal(tinycolor("transparent").toHex(), "000000", "toHex");
});


module("Brightness handling");

test("getBrightness", function() {
  equal(tinycolor('#000').getBrightness(), 0, 'returns 0 for #000');
  equal(tinycolor('#fff').getBrightness(), 255, 'returns 255 for #fff');
});

test("getLuminance", function() {
  equal(tinycolor('#000').getLuminance(), 0, 'returns 0 for #000');
  equal(tinycolor('#fff').getLuminance(), 1, 'returns 1 for #fff');
});

test("isDark returns true/false for dark/light colors", function() {
  equal(tinycolor('#000').isDark(), true, '#000 is dark');
  equal(tinycolor('#111').isDark(), true, '#111 is dark');
  equal(tinycolor('#222').isDark(), true, '#222 is dark');
  equal(tinycolor('#333').isDark(), true, '#333 is dark');
  equal(tinycolor('#444').isDark(), true, '#444 is dark');
  equal(tinycolor('#555').isDark(), true, '#555 is dark');
  equal(tinycolor('#666').isDark(), true, '#666 is dark');
  equal(tinycolor('#777').isDark(), true, '#777 is dark');
  equal(tinycolor('#888').isDark(), false, '#888 is not dark');
  equal(tinycolor('#999').isDark(), false, '#999 is not dark');
  equal(tinycolor('#aaa').isDark(), false, '#aaa is not dark');
  equal(tinycolor('#bbb').isDark(), false, '#bbb is not dark');
  equal(tinycolor('#ccc').isDark(), false, '#ccc is not dark');
  equal(tinycolor('#ddd').isDark(), false, '#ddd is not dark');
  equal(tinycolor('#eee').isDark(), false, '#eee is not dark');
  equal(tinycolor('#fff').isDark(), false, '#fff is not dark');
});

test("isLight returns true/false for light/dark colors", function() {
  equal(tinycolor('#000').isLight(), false, '#000 is not light');
  equal(tinycolor('#111').isLight(), false, '#111 is not light');
  equal(tinycolor('#222').isLight(), false, '#222 is not light');
  equal(tinycolor('#333').isLight(), false, '#333 is not light');
  equal(tinycolor('#444').isLight(), false, '#444 is not light');
  equal(tinycolor('#555').isLight(), false, '#555 is not light');
  equal(tinycolor('#666').isLight(), false, '#666 is not light');
  equal(tinycolor('#777').isLight(), false, '#777 is not light');
  equal(tinycolor('#888').isLight(), true, '#888 is light');
  equal(tinycolor('#999').isLight(), true, '#999 is light');
  equal(tinycolor('#aaa').isLight(), true, '#aaa is light');
  equal(tinycolor('#bbb').isLight(), true, '#bbb is light');
  equal(tinycolor('#ccc').isLight(), true, '#ccc is light');
  equal(tinycolor('#ddd').isLight(), true, '#ddd is light');
  equal(tinycolor('#eee').isLight(), true, '#eee is light');
  equal(tinycolor('#fff').isLight(), true, '#fff is light');
});

module("Initialization from tinycolor output");

test("HSL Object", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    equal(tiny.toHexString(), tinycolor(tiny.toHsl()).toHexString(), "HSL Object");
  }
});

test("HSL String", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    var input = tiny.toRgb();
    var output = tinycolor(tiny.toHslString()).toRgb();
    var maxDiff = 2;

    equal(Math.abs(input.r - output.r) <= maxDiff, true, "toHslString red value difference <= " + maxDiff);
    equal(Math.abs(input.g - output.g) <= maxDiff, true, "toHslString green value difference <= " + maxDiff);
    equal(Math.abs(input.b - output.b) <= maxDiff, true, "toHslString blue value difference <= " + maxDiff);
  }
});

test("HSV String", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    var input = tiny.toRgb();
    var output = tinycolor(tiny.toHsvString()).toRgb();
    var maxDiff = 2;

    equal(Math.abs(input.r - output.r) <= maxDiff, true, "toHsvString red value difference <= " + maxDiff);
    equal(Math.abs(input.g - output.g) <= maxDiff, true, "toHsvString green value difference <= " + maxDiff);
    equal(Math.abs(input.b - output.b) <= maxDiff, true, "toHsvString blue value difference <= " + maxDiff);
  }
});

test("HSV Object", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    equal(tiny.toHexString(), tinycolor(tiny.toHsv()).toHexString(), "HSV Object");
  }
});

test("RGB Object", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    equal(tiny.toHexString(), tinycolor(tiny.toRgb()).toHexString(), "RGB Object");
  }
});

test("RGB String", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    equal(tiny.toHexString(), tinycolor(tiny.toRgbString()).toHexString(), "RGB String");
  }
});

test("PRGB Object", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    var input = tiny.toRgb();
    var output = tinycolor(tiny.toPercentageRgb()).toRgb();
    var maxDiff = 2;

    equal(Math.abs(input.r - output.r) <= maxDiff, true, "Red value difference <= " + maxDiff);
    equal(Math.abs(input.g - output.g) <= maxDiff, true, "Green value difference <= " + maxDiff);
    equal(Math.abs(input.b - output.b) <= maxDiff, true, "Blue value difference <= " + maxDiff);
  }
});

test("PRGB String", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    var input = tiny.toRgb();
    var output = tinycolor(tiny.toPercentageRgbString()).toRgb();
    var maxDiff = 2;

    equal(Math.abs(input.r - output.r) <= maxDiff, true, "Red value difference <= " + maxDiff);
    equal(Math.abs(input.g - output.g) <= maxDiff, true, "Green value difference <= " + maxDiff);
    equal(Math.abs(input.b - output.b) <= maxDiff, true, "Blue value difference <= " + maxDiff);
  }
});

test("Object", function() {
  for (var i = 0; i < conversions.length; i++) {
    var c =  conversions[i];
    var tiny =  tinycolor(c.hex);
    equal(tiny.toHexString(), tinycolor(tiny).toHexString(), "Object");
  }
});

module("Utilities");

test("Color equality", function() {
  ok(tinycolor.equals("#ff0000", "#ff0000"), "Same hex");
  ok(tinycolor.equals("#ff0000", "rgb(255, 0, 0)"), "Same alphas");
  ok(!tinycolor.equals("#ff0000", "rgba(255, 0, 0, .1)"), "Different alphas");
  ok(tinycolor.equals("#ff000066", "rgba(255, 0, 0, .4)"), "Same alphas");
  ok(tinycolor.equals("#f009", "rgba(255, 0, 0, .6)"), "Same alphas");
  ok(tinycolor.equals("#336699CC", "369C"), "Same hex");
  ok(tinycolor.equals("ff0000", "#ff0000"), "Same hex");
  ok(tinycolor.equals("#f00", "#ff0000"), "Same hex");
  ok(tinycolor.equals("#f00", "#ff0000"), "Same hex");
  ok(tinycolor.equals("f00", "#ff0000"), "Same hex");
  equal(tinycolor("010101").toHexString(), "#010101");
  ok(!tinycolor.equals("#ff0000", "#00ff00"), "Different hex");
  ok(tinycolor.equals("#ff8000", "rgb(100%, 50%, 0%)"), "Percentage bounds checking");
});

test("isReadable", function() {
  // "#ff0088", "#8822aa" (values used in old WCAG1 tests)
  ok(tinycolor.isReadable("#000000", "#ffffff",{level:"AA",size:"small"}), "white/black is readable");
  ok(!tinycolor.isReadable("#ff0088", "#5c1a72",{}), "not readable - empty wcag2 object");
  ok(!tinycolor.isReadable("#ff0088", "#8822aa",{level:"AA",size:"small"}), "not readable - AA small");
  ok(!tinycolor.isReadable("#ff0088", "#8822aa",{level:"AA",size:"large"}), "not  readable - AA large");
  ok(!tinycolor.isReadable("#ff0088", "#8822aa",{level:"AAA",size:"small"}), "not readable - AAA small");
  ok(!tinycolor.isReadable("#ff0088", "#8822aa",{level:"AAA",size:"large"}), "not readable - AAA large");

  // values derived from and validated using the calculators at http://www.dasplankton.de/ContrastA/
  // and http://webaim.org/resources/contrastchecker/

  // "#ff0088", "#5c1a72": contrast ratio 3.04
  ok(!tinycolor.isReadable("#ff0088", "#5c1a72",{level:"AA",size:"small"}), "not readable - AA small");
  ok(tinycolor.isReadable("#ff0088", "#5c1a72",{level:"AA",size:"large"}), "readable - AA large");
  ok(!tinycolor.isReadable("#ff0088", "#5c1a72",{level:"AAA",size:"small"}), "not readable - AAA small");
  ok(!tinycolor.isReadable("#ff0088", "#5c1a72",{level:"AAA",size:"large"}), "not readable - AAA large");

  // "#ff0088", "#2e0c3a": contrast ratio 4.56
  ok(tinycolor.isReadable("#ff0088", "#2e0c3a",{level:"AA",size:"small"}), "readable - AA small");
  ok(tinycolor.isReadable("#ff0088", "#2e0c3a",{level:"AA",size:"large"}), "readable - AA large");
  ok(!tinycolor.isReadable("#ff0088", "#2e0c3a",{level:"AAA",size:"small"}), "not readable - AAA small");
  ok(tinycolor.isReadable("#ff0088", "#2e0c3a",{level:"AAA",size:"large"}), "readable - AAA large");

  // "#db91b8", "#2e0c3a":  contrast ratio 7.12
  ok(tinycolor.isReadable("#db91b8", "#2e0c3a",{level:"AA",size:"small"}), "readable - AA small");
  ok(tinycolor.isReadable("#db91b8", "#2e0c3a",{level:"AA",size:"large"}), "readable - AA large");
  ok(tinycolor.isReadable("#db91b8", "#2e0c3a",{level:"AAA",size:"small"}), "readable - AAA small");
  ok(tinycolor.isReadable("#db91b8", "#2e0c3a",{level:"AAA",size:"large"}), "readable - AAA large");
});

test("readability", function() {
  // check return values from readability function. See isReadable above for standards tests.
  equal(tinycolor.readability("#000", "#000"), 1, "Readability function test 0");
  deepEqual(tinycolor.readability("#000", "#111"), 1.1121078324840545, "Readability function test 1");
  deepEqual(tinycolor.readability("#000", "#fff"), 21, "Readability function test 2");
});

test("mostReadable", function () {
  equal(tinycolor.mostReadable("#000", ["#111", "#222",{wcag2:{}}]).toHexString(), "#222222", "readable color present");
  equal(tinycolor.mostReadable("#f00", ["#d00", "#0d0"],{wcag2:{}}).toHexString(), "#00dd00", "readable color present");
  equal(tinycolor.mostReadable("#fff", ["#fff", "#fff"],{wcag2:{}}).toHexString(), "#ffffff", "no different color in list");
  //includeFallbackColors
  equal(tinycolor.mostReadable("#fff", ["#fff", "#fff"],{includeFallbackColors:true}).toHexString(), "#000000", "no different color in list");
  equal(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(), "#112255", "no readable color in list");
  equal(tinycolor.mostReadable("#123", ["#000", "#fff"],{includeFallbackColors:false}).toHexString(), "#ffffff", "verify assumption");
  equal(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString(), "#ffffff", "no readable color in list");

  equal(tinycolor.mostReadable("#ff0088", ["#000", "#fff"],{includeFallbackColors:false}).toHexString(), "#000000", "verify assumption");
  equal(tinycolor.mostReadable("#ff0088", ["#2e0c3a"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(), "#2e0c3a", "readable color present");
  equal(tinycolor.mostReadable("#ff0088", ["#2e0c3a"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(), "#000000", "no readable color in list");

  equal(tinycolor.mostReadable("#371b2c", ["#000", "#fff"],{includeFallbackColors:false}).toHexString(), "#ffffff", "verify assumption");
  equal(tinycolor.mostReadable("#371b2c", ["#a9acb6"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(), "#a9acb6", "readable color present");
  equal(tinycolor.mostReadable("#371b2c", ["#a9acb6"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(), "#ffffff", "no readable color in list");
});


test("Filters", function () {
  equal(tinycolor("red").toFilter(), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffff0000,endColorstr=#ffff0000)");
  equal(tinycolor("red").toFilter("blue"), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffff0000,endColorstr=#ff0000ff)");

  equal(tinycolor("transparent").toFilter(), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#00000000)");
  equal(tinycolor("transparent").toFilter("red"), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#ffff0000)");

  equal(tinycolor("#f0f0f0dd").toFilter(), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#ddf0f0f0,endColorstr=#ddf0f0f0)");
  equal(tinycolor("rgba(0, 0, 255, .5").toFilter(), "progid:DXImageTransform.Microsoft.gradient(startColorstr=#800000ff,endColorstr=#800000ff)");
});

module("Modifications");

/* Originally generated with:
var results = [];
for (var i = 0; i <= 100; i++) results.push( tinycolor.saturate("red", i).toHex() )
console.log(JSON.stringify(results))
*/
var DESATURATIONS = ["ff0000","fe0101","fc0303","fb0404","fa0505","f90606","f70808","f60909","f50a0a","f40b0b","f20d0d","f10e0e","f00f0f","ee1111","ed1212","ec1313","eb1414","e91616","e81717","e71818","e61919","e41b1b","e31c1c","e21d1d","e01f1f","df2020","de2121","dd2222","db2424","da2525","d92626","d72828","d62929","d52a2a","d42b2b","d22d2d","d12e2e","d02f2f","cf3030","cd3232","cc3333","cb3434","c93636","c83737","c73838","c63939","c43b3b","c33c3c","c23d3d","c13e3e","bf4040","be4141","bd4242","bb4444","ba4545","b94646","b84747","b64949","b54a4a","b44b4b","b34d4d","b14e4e","b04f4f","af5050","ad5252","ac5353","ab5454","aa5555","a85757","a75858","a65959","a45b5b","a35c5c","a25d5d","a15e5e","9f6060","9e6161","9d6262","9c6363","9a6565","996666","986767","966969","956a6a","946b6b","936c6c","916e6e","906f6f","8f7070","8e7171","8c7373","8b7474","8a7575","887777","877878","867979","857a7a","837c7c","827d7d","817e7e","808080"];
var SATURATIONS = ["ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000","ff0000"];
var LIGHTENS = ["ff0000","ff0505","ff0a0a","ff0f0f","ff1414","ff1a1a","ff1f1f","ff2424","ff2929","ff2e2e","ff3333","ff3838","ff3d3d","ff4242","ff4747","ff4d4d","ff5252","ff5757","ff5c5c","ff6161","ff6666","ff6b6b","ff7070","ff7575","ff7a7a","ff8080","ff8585","ff8a8a","ff8f8f","ff9494","ff9999","ff9e9e","ffa3a3","ffa8a8","ffadad","ffb3b3","ffb8b8","ffbdbd","ffc2c2","ffc7c7","ffcccc","ffd1d1","ffd6d6","ffdbdb","ffe0e0","ffe5e5","ffebeb","fff0f0","fff5f5","fffafa","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff"];
var BRIGHTENS = ["ff0000","ff0303","ff0505","ff0808","ff0a0a","ff0d0d","ff0f0f","ff1212","ff1414","ff1717","ff1919","ff1c1c","ff1f1f","ff2121","ff2424","ff2626","ff2929","ff2b2b","ff2e2e","ff3030","ff3333","ff3636","ff3838","ff3b3b","ff3d3d","ff4040","ff4242","ff4545","ff4747","ff4a4a","ff4c4c","ff4f4f","ff5252","ff5454","ff5757","ff5959","ff5c5c","ff5e5e","ff6161","ff6363","ff6666","ff6969","ff6b6b","ff6e6e","ff7070","ff7373","ff7575","ff7878","ff7a7a","ff7d7d","ff7f7f","ff8282","ff8585","ff8787","ff8a8a","ff8c8c","ff8f8f","ff9191","ff9494","ff9696","ff9999","ff9c9c","ff9e9e","ffa1a1","ffa3a3","ffa6a6","ffa8a8","ffabab","ffadad","ffb0b0","ffb2b2","ffb5b5","ffb8b8","ffbaba","ffbdbd","ffbfbf","ffc2c2","ffc4c4","ffc7c7","ffc9c9","ffcccc","ffcfcf","ffd1d1","ffd4d4","ffd6d6","ffd9d9","ffdbdb","ffdede","ffe0e0","ffe3e3","ffe5e5","ffe8e8","ffebeb","ffeded","fff0f0","fff2f2","fff5f5","fff7f7","fffafa","fffcfc","ffffff"];
var DARKENS = ["ff0000","fa0000","f50000","f00000","eb0000","e60000","e00000","db0000","d60000","d10000","cc0000","c70000","c20000","bd0000","b80000","b30000","ad0000","a80000","a30000","9e0000","990000","940000","8f0000","8a0000","850000","800000","7a0000","750000","700000","6b0000","660000","610000","5c0000","570000","520000","4d0000","470000","420000","3d0000","380000","330000","2e0000","290000","240000","1f0000","190000","140000","0f0000","0a0000","050000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000","000000"];

test("Modifications", function () {
  for (var i = 0; i <= 100; i++) {
    equal(tinycolor("red").desaturate(i).toHex(), DESATURATIONS[i], "Desaturation " + i + " works");
  }
  for (var i = 0; i <= 100; i++) {
    equal(tinycolor("red").saturate(i).toHex(), SATURATIONS[i], "Saturation " + i + " works");
  }
  for (var i = 0; i <= 100; i++) {
    equal(tinycolor("red").lighten(i).toHex(), LIGHTENS[i], "Lighten " + i + " works");
  }
  for (var i = 0; i <= 100; i++) {
    equal(tinycolor("red").brighten(i).toHex(), BRIGHTENS[i], "Brighter " + i + " works");
  }
  for (var i = 0; i <= 100; i++) {
    equal(tinycolor("red").darken(i).toHex(), DARKENS[i], "Darken " + i + " works");
  }

  equal(tinycolor("red").greyscale().toHex(), "808080", "Greyscale works");
});

test("Spin", function () {
    equal(Math.round(tinycolor("#f00").spin(-1234).toHsl().h), 206, "Spinning -1234 works");
    equal(Math.round(tinycolor("#f00").spin(-360).toHsl().h), 0, "Spinning -360 works");
    equal(Math.round(tinycolor("#f00").spin(-120).toHsl().h), 240, "Spinning -120 works");
    equal(Math.round(tinycolor("#f00").spin(0).toHsl().h), 0, "Spinning 0 works");
    equal(Math.round(tinycolor("#f00").spin(10).toHsl().h), 10, "Spinning 10 works");
    equal(Math.round(tinycolor("#f00").spin(360).toHsl().h), 0, "Spinning 360 works");
    equal(Math.round(tinycolor("#f00").spin(2345).toHsl().h), 185, "Spinning 2345 works");

    [-360, 0, 360].forEach(function (delta) {
      Object.keys(tinycolor.names).forEach(function (name) {
        equal(tinycolor(name).toHex(), tinycolor(name).spin(delta).toHex(), "Spinning " + delta.toString() + " has no effect")
      })
    })
});

test("Mix", function () {
    // amount 0 or none
    equal(tinycolor.mix('#000', '#fff').toHsl().l, 0.5, "Mixing without amount works");
    equal(tinycolor.mix('#f00', '#000', 0).toHex(), 'ff0000', "Mixing with 0 amount works");
    // This case checks the the problem with floating point numbers (eg 255/90)
    equal(tinycolor.mix('#fff', '#000', 90).toHex(), '1a1a1a', "Mixing with 90 amount works correctly");

    // black and white
    for (var i = 0; i < 100; i++) {
        equal(Math.round(tinycolor.mix('#000', '#fff', i).toHsl().l * 100) / 100, i / 100, "Mixing black and white with " + i + " amount works");
    }

    // with colors
    for (var i = 0; i < 100; i++) {
        var new_hex = Math.round((255 * (100 - i)) / 100).toString(16);

        if (new_hex.length === 1) {
            new_hex = '0' + new_hex;
        }

        equal(tinycolor.mix('#f00', '#000', i).toHex(),  new_hex + '0000', "Mixing " + i + " (red channel)");
        equal(tinycolor.mix('#0f0', '#000', i).toHex(),  '00' + new_hex + '00', "Mixing " + i + " (green channel)");
        equal(tinycolor.mix('#00f', '#000', i).toHex(),  '0000' + new_hex, "Mixing " + i + " (blue channel)");
        equal(tinycolor.mix(tinycolor('transparent'), '#000', i).toRgb().a, i / 100, "Mixing " + i + " (alpha channel)");
    }
});

// The combination tests need to be expanded further
module("Combinations");

function colorsToHexString(colors) {
  return colors.map(function(c) {
    return c.toHex();
  }).join(",");
}

test("complement", function() {
  var complementDoesntModifyInstance = tinycolor("red");
  equal(complementDoesntModifyInstance.complement().toHex(), "00ffff", "Complement works");
  equal(complementDoesntModifyInstance.toHex(), "ff0000", "Complement did not modify this color");
});

test("analogous", function() {
  var combination = tinycolor("red").analogous();
  equal(colorsToHexString(combination), "ff0000,ff0066,ff0033,ff0000,ff3300,ff6600", "Correct Combination");
});

test("monochromatic", function() {
  var combination = tinycolor("red").monochromatic();
  equal(colorsToHexString(combination), "ff0000,2a0000,550000,800000,aa0000,d40000", "Correct Combination");
});

test("splitcomplement", function() {
  var combination = tinycolor("red").splitcomplement();
  equal(colorsToHexString(combination), "ff0000,ccff00,0066ff", "Correct Combination");
});

test("triad", function() {
  var combination = tinycolor("red").triad();
  equal(colorsToHexString(combination), "ff0000,00ff00,0000ff", "Correct Combination");
});

test("tetrad", function() {
  var combination = tinycolor("red").tetrad();
  equal(colorsToHexString(combination), "ff0000,80ff00,00ffff,7f00ff", "Correct Combination");
});
