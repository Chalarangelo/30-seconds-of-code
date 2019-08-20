"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const ava_1 = require("ava");
const jsdom_1 = require("jsdom");
const __1 = require("..");
const isNode8orHigher = Number(process.versions.node.split('.')[0]) >= 8;
class ErrorSubclassFixture extends Error {
}
const document = jsdom_1.jsdom();
const createDomElement = (el) => document.createElement(el);
const types = new Map([
    ['undefined', {
            is: __1.default.undefined,
            fixtures: [
                undefined
            ]
        }],
    ['null', {
            is: __1.default.null_,
            fixtures: [
                null
            ]
        }],
    ['string', {
            is: __1.default.string,
            fixtures: [
                '🦄',
                'hello world',
                ''
            ]
        }],
    ['number', {
            is: __1.default.number,
            fixtures: [
                6,
                1.4,
                0,
                -0,
                Infinity,
                -Infinity
            ]
        }],
    ['boolean', {
            is: __1.default.boolean,
            fixtures: [
                true, false
            ]
        }],
    ['symbol', {
            is: __1.default.symbol,
            fixtures: [
                Symbol('🦄')
            ]
        }],
    ['array', {
            is: __1.default.array,
            fixtures: [
                [1, 2],
                new Array(2)
            ]
        }],
    ['function', {
            is: __1.default.function_,
            fixtures: [
                function foo() { },
                function () { },
                () => { },
                function () {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                function* () { }
            ]
        }],
    ['buffer', {
            is: __1.default.buffer,
            fixtures: [
                Buffer.from('🦄')
            ]
        }],
    ['object', {
            is: __1.default.object,
            fixtures: [
                { x: 1 },
                Object.create({ x: 1 })
            ]
        }],
    ['regExp', {
            is: __1.default.regExp,
            fixtures: [
                /\w/,
                new RegExp('\\w')
            ]
        }],
    ['date', {
            is: __1.default.date,
            fixtures: [
                new Date()
            ]
        }],
    ['error', {
            is: __1.default.error,
            fixtures: [
                new Error('🦄'),
                new ErrorSubclassFixture()
            ]
        }],
    ['nativePromise', {
            is: __1.default.nativePromise,
            fixtures: [
                Promise.resolve(),
            ]
        }],
    ['promise', {
            is: __1.default.promise,
            fixtures: [
                { then() { }, catch() { } }
            ]
        }],
    ['generator', {
            is: __1.default.generator,
            fixtures: [
                (function* () { yield 4; })()
            ]
        }],
    ['generatorFunction', {
            is: __1.default.generatorFunction,
            fixtures: [
                function* () { yield 4; }
            ]
        }],
    ['asyncFunction', {
            is: __1.default.asyncFunction,
            fixtures: [
                function () {
                    return __awaiter(this, void 0, void 0, function* () { });
                },
                () => __awaiter(this, void 0, void 0, function* () { })
            ]
        }],
    ['map', {
            is: __1.default.map,
            fixtures: [
                new Map()
            ]
        }],
    ['set', {
            is: __1.default.set,
            fixtures: [
                new Set()
            ]
        }],
    ['weakSet', {
            is: __1.default.weakSet,
            fixtures: [
                new WeakSet()
            ]
        }],
    ['weakMap', {
            is: __1.default.weakMap,
            fixtures: [
                new WeakMap()
            ]
        }],
    ['int8Array', {
            is: __1.default.int8Array,
            fixtures: [
                new Int8Array(0)
            ]
        }],
    ['uint8Array', {
            is: __1.default.uint8Array,
            fixtures: [
                new Uint8Array(0)
            ]
        }],
    ['uint8ClampedArray', {
            is: __1.default.uint8ClampedArray,
            fixtures: [
                new Uint8ClampedArray(0)
            ]
        }],
    ['int16Array', {
            is: __1.default.int16Array,
            fixtures: [
                new Int16Array(0)
            ]
        }],
    ['uint16Array', {
            is: __1.default.uint16Array,
            fixtures: [
                new Uint16Array(0)
            ]
        }],
    ['int32Array', {
            is: __1.default.int32Array,
            fixtures: [
                new Int32Array(0)
            ]
        }],
    ['uint32Array', {
            is: __1.default.uint32Array,
            fixtures: [
                new Uint32Array(0)
            ]
        }],
    ['float32Array', {
            is: __1.default.float32Array,
            fixtures: [
                new Float32Array(0)
            ]
        }],
    ['float64Array', {
            is: __1.default.float64Array,
            fixtures: [
                new Float64Array(0)
            ]
        }],
    ['arrayBuffer', {
            is: __1.default.arrayBuffer,
            fixtures: [
                new ArrayBuffer(10)
            ]
        }],
    ['nan', {
            is: __1.default.nan,
            fixtures: [
                NaN,
                Number.NaN
            ]
        }],
    ['nullOrUndefined', {
            is: __1.default.nullOrUndefined,
            fixtures: [
                null,
                undefined
            ]
        }],
    ['plainObject', {
            is: __1.default.plainObject,
            fixtures: [
                { x: 1 },
                Object.create(null),
                new Object()
            ]
        }],
    ['integer', {
            is: __1.default.integer,
            fixtures: [
                6
            ]
        }],
    ['safeInteger', {
            is: __1.default.safeInteger,
            fixtures: [
                Math.pow(2, 53) - 1,
                -Math.pow(2, 53) + 1
            ]
        }],
    ['domElement', {
            is: __1.default.domElement,
            fixtures: [
                'div',
                'input',
                'span',
                'img',
                'canvas',
                'script'
            ].map(createDomElement)
        }
    ], ['non-domElements', {
            is: value => !__1.default.domElement(value),
            fixtures: [
                document.createTextNode('data'),
                document.createProcessingInstruction('xml-stylesheet', 'href="mycss.css" type="text/css"'),
                document.createComment('This is a comment'),
                document,
                document.implementation.createDocumentType('svg:svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'),
                document.createDocumentFragment()
            ]
        }],
    ['infinite', {
            is: __1.default.infinite,
            fixtures: [
                Infinity,
                -Infinity
            ]
        }]
]);
const testType = (t, type, exclude) => {
    const testData = types.get(type);
    if (testData === undefined) {
        t.fail(`is.${type} not defined`);
        return;
    }
    const { is } = testData;
    for (const [key, { fixtures }] of types) {
        if (exclude && exclude.indexOf(key) !== -1) {
            continue;
        }
        const assert = key === type ? t.true.bind(t) : t.false.bind(t);
        for (const fixture of fixtures) {
            assert(is(fixture), `Value: ${util.inspect(fixture)}`);
        }
    }
};
ava_1.default('is', t => {
    t.is(__1.default(null), 'null');
    t.is(__1.default(undefined), 'undefined');
});
ava_1.default('is.undefined', t => {
    testType(t, 'undefined', ['nullOrUndefined']);
});
ava_1.default('is.null', t => {
    testType(t, 'null', ['nullOrUndefined']);
});
ava_1.default('is.string', t => {
    testType(t, 'string');
});
ava_1.default('is.number', t => {
    testType(t, 'number', ['nan', 'integer', 'safeInteger', 'infinite']);
});
ava_1.default('is.boolean', t => {
    testType(t, 'boolean');
});
ava_1.default('is.symbol', t => {
    testType(t, 'symbol');
});
ava_1.default('is.array', t => {
    testType(t, 'array');
});
ava_1.default('is.function', t => {
    testType(t, 'function', ['generatorFunction', 'asyncFunction']);
});
ava_1.default('is.buffer', t => {
    testType(t, 'buffer');
});
ava_1.default('is.object', t => {
    const testData = types.get('object');
    if (testData === undefined) {
        t.fail('is.object not defined');
        return;
    }
    for (const el of testData.fixtures) {
        t.true(__1.default.object(el));
    }
});
ava_1.default('is.regExp', t => {
    testType(t, 'regExp');
});
ava_1.default('is.date', t => {
    testType(t, 'date');
});
ava_1.default('is.error', t => {
    testType(t, 'error');
});
if (isNode8orHigher) {
    ava_1.default('is.nativePromise', t => {
        testType(t, 'nativePromise');
    });
    ava_1.default('is.promise', t => {
        testType(t, 'promise', ['nativePromise']);
    });
}
ava_1.default('is.generator', t => {
    testType(t, 'generator');
});
ava_1.default('is.generatorFunction', t => {
    testType(t, 'generatorFunction', ['function']);
});
ava_1.default('is.map', t => {
    testType(t, 'map');
});
ava_1.default('is.set', t => {
    testType(t, 'set');
});
ava_1.default('is.weakMap', t => {
    testType(t, 'weakMap');
});
ava_1.default('is.weakSet', t => {
    testType(t, 'weakSet');
});
ava_1.default('is.int8Array', t => {
    testType(t, 'int8Array');
});
ava_1.default('is.uint8Array', t => {
    testType(t, 'uint8Array', ['buffer']);
});
ava_1.default('is.uint8ClampedArray', t => {
    testType(t, 'uint8ClampedArray');
});
ava_1.default('is.int16Array', t => {
    testType(t, 'int16Array');
});
ava_1.default('is.uint16Array', t => {
    testType(t, 'uint16Array');
});
ava_1.default('is.int32Array', t => {
    testType(t, 'int32Array');
});
ava_1.default('is.uint32Array', t => {
    testType(t, 'uint32Array');
});
ava_1.default('is.float32Array', t => {
    testType(t, 'float32Array');
});
ava_1.default('is.float64Array', t => {
    testType(t, 'float64Array');
});
ava_1.default('is.arrayBuffer', t => {
    testType(t, 'arrayBuffer');
});
ava_1.default('is.dataView', t => {
    testType(t, 'arrayBuffer');
});
ava_1.default('is.truthy', t => {
    t.true(__1.default.truthy('unicorn'));
    t.true(__1.default.truthy('🦄'));
    t.true(__1.default.truthy(new Set()));
    t.true(__1.default.truthy(Symbol('🦄')));
    t.true(__1.default.truthy(true));
});
ava_1.default('is.falsy', t => {
    t.true(__1.default.falsy(false));
    t.true(__1.default.falsy(0));
    t.true(__1.default.falsy(''));
    t.true(__1.default.falsy(null));
    t.true(__1.default.falsy(undefined));
    t.true(__1.default.falsy(NaN));
});
ava_1.default('is.nan', t => {
    testType(t, 'nan');
});
ava_1.default('is.nullOrUndefined', t => {
    testType(t, 'nullOrUndefined', ['undefined', 'null']);
});
ava_1.default('is.primitive', t => {
    const primitives = [
        undefined,
        null,
        '🦄',
        6,
        Infinity,
        -Infinity,
        true,
        false,
        Symbol('🦄')
    ];
    for (const el of primitives) {
        t.true(__1.default.primitive(el));
    }
});
ava_1.default('is.integer', t => {
    testType(t, 'integer', ['number', 'safeInteger']);
    t.false(__1.default.integer(1.4));
});
ava_1.default('is.safeInteger', t => {
    testType(t, 'safeInteger', ['number', 'integer']);
    t.false(__1.default.safeInteger(Math.pow(2, 53)));
    t.false(__1.default.safeInteger(-Math.pow(2, 53)));
});
ava_1.default('is.plainObject', t => {
    testType(t, 'plainObject', ['object', 'promise']);
});
ava_1.default('is.iterable', t => {
    t.true(__1.default.iterable(''));
    t.true(__1.default.iterable([]));
    t.true(__1.default.iterable(new Map()));
    t.false(__1.default.iterable(null));
    t.false(__1.default.iterable(undefined));
    t.false(__1.default.iterable(0));
    t.false(__1.default.iterable(NaN));
    t.false(__1.default.iterable(Infinity));
    t.false(__1.default.iterable({}));
});
ava_1.default('is.class', t => {
    class Foo {
    }
    const classDeclarations = [
        Foo,
        class Bar extends Foo {
        }
    ];
    for (const x of classDeclarations) {
        t.true(__1.default.class_(x));
    }
});
ava_1.default('is.typedArray', t => {
    const typedArrays = [
        new Int8Array(0),
        new Uint8Array(0),
        new Uint8ClampedArray(0),
        new Uint16Array(0),
        new Int32Array(0),
        new Uint32Array(0),
        new Float32Array(0),
        new Float64Array(0)
    ];
    for (const el of typedArrays) {
        t.true(__1.default.typedArray(el));
    }
    t.false(__1.default.typedArray(new ArrayBuffer(1)));
    t.false(__1.default.typedArray([]));
    t.false(__1.default.typedArray({}));
});
ava_1.default('is.arrayLike', t => {
    (() => {
        t.true(__1.default.arrayLike(arguments));
    })();
    t.true(__1.default.arrayLike([]));
    t.true(__1.default.arrayLike('unicorn'));
    t.false(__1.default.arrayLike({}));
    t.false(__1.default.arrayLike(() => { }));
    t.false(__1.default.arrayLike(new Map()));
});
ava_1.default('is.inRange', t => {
    const x = 3;
    t.true(__1.default.inRange(x, [0, 5]));
    t.true(__1.default.inRange(x, [5, 0]));
    t.true(__1.default.inRange(x, [-5, 5]));
    t.true(__1.default.inRange(x, [5, -5]));
    t.false(__1.default.inRange(x, [4, 8]));
    t.true(__1.default.inRange(-7, [-5, -10]));
    t.true(__1.default.inRange(-5, [-5, -10]));
    t.true(__1.default.inRange(-10, [-5, -10]));
    t.true(__1.default.inRange(x, 10));
    t.true(__1.default.inRange(0, 0));
    t.true(__1.default.inRange(-2, -3));
    t.false(__1.default.inRange(x, 2));
    t.false(__1.default.inRange(-3, -2));
    t.throws(() => {
        __1.default.inRange(0, []);
    });
    t.throws(() => {
        __1.default.inRange(0, [5]);
    });
    t.throws(() => {
        __1.default.inRange(0, [1, 2, 3]);
    });
});
ava_1.default('is.domElement', t => {
    testType(t, 'domElement');
    t.false(__1.default.domElement({ nodeType: 1, nodeName: 'div' }));
});
ava_1.default('is.infinite', t => {
    testType(t, 'infinite', ['number']);
});
ava_1.default('is.even', t => {
    for (const el of [-6, 2, 4]) {
        t.true(__1.default.even(el));
    }
    for (const el of [-3, 1, 5]) {
        t.false(__1.default.even(el));
    }
});
ava_1.default('is.odd', t => {
    for (const el of [-5, 7, 13]) {
        t.true(__1.default.odd(el));
    }
    for (const el of [-8, 8, 10]) {
        t.false(__1.default.odd(el));
    }
});
ava_1.default('is.empty', t => {
    t.true(__1.default.empty(null));
    t.true(__1.default.empty(undefined));
    t.true(__1.default.empty(false));
    t.false(__1.default.empty(true));
    t.true(__1.default.empty(''));
    t.false(__1.default.empty('🦄'));
    t.true(__1.default.empty([]));
    t.false(__1.default.empty(['🦄']));
    t.true(__1.default.empty({}));
    t.false(__1.default.empty({ unicorn: '🦄' }));
    const tempMap = new Map();
    t.true(__1.default.empty(tempMap));
    tempMap.set('unicorn', '🦄');
    t.false(__1.default.empty(tempMap));
    const tempSet = new Set();
    t.true(__1.default.empty(tempSet));
    tempSet.add(1);
    t.false(__1.default.empty(tempSet));
});
ava_1.default('is.emptyOrWhitespace', t => {
    t.true(__1.default.emptyOrWhitespace(''));
    t.true(__1.default.emptyOrWhitespace('  '));
    t.false(__1.default.emptyOrWhitespace('🦄'));
    t.false(__1.default.emptyOrWhitespace('unicorn'));
});
ava_1.default('is.any', t => {
    t.true(__1.default.any(__1.default.string, {}, true, '🦄'));
    t.true(__1.default.any(__1.default.object, false, {}, 'unicorns'));
    t.false(__1.default.any(__1.default.boolean, '🦄', [], 3));
    t.false(__1.default.any(__1.default.integer, true, 'lol', {}));
    t.throws(() => {
        __1.default.any(null, true);
    });
    t.throws(() => {
        __1.default.any(__1.default.string);
    });
});
ava_1.default('is.all', t => {
    t.true(__1.default.all(__1.default.object, {}, new Set(), new Map()));
    t.true(__1.default.all(__1.default.boolean, true, false));
    t.false(__1.default.all(__1.default.string, '🦄', []));
    t.false(__1.default.all(__1.default.set, new Map(), {}));
    t.throws(() => {
        __1.default.all(null, true);
    });
    t.throws(() => {
        __1.default.all(__1.default.string);
    });
});
//# sourceMappingURL=test.js.map