# 30-seconds-of-code JavaScript Glossary

## Table of Contents

* [`AJAX`](#ajax)
* [`API`](#api)
* [`Argument`](#argument)
* [`Array`](#array)
* [`Asynchronous programming`](#asynchronous-programming)
* [`Automatic semicolon insertion`](#automatic-semicolon-insertion)
* [`Boolean`](#boolean)
* [`Callback`](#callback)
* [`Character encoding`](#character-encoding)
* [`Class`](#class)
* [`Closure`](#closure)
* [`CoffeeScript`](#coffeescript)
* [`Constant`](#constant)
* [`Constructor`](#constructor)
* [`Continuous Deployment`](#continuous-deployment)
* [`Continuous Integration`](#continuous-integration)
* [`CORS`](#cors)
* [`Cross-site scripting (XSS)`](#cross-site-scripting-xss)
* [`CSS`](#css)
* [`CSV`](#csv)
* [`Currying`](#currying)
* [`Deserialization`](#deserialization)
* [`DNS`](#dns)
* [`DOM`](#dom)
* [`Domain name registrar`](#domain-name-registrar)
* [`Domain name`](#domain-name)
* [`Element`](#element)
* [`ES6`](#es6)
* [`Event-driven programming`](#event-driven-programming)
* [`Event loop`](#event-loop)
* [`Express`](#express)
* [`Factory functions`](#factory-functions)
* [`First-class function`](#first-class-function)
* [`Flexbox`](#flexbox)
* [`Function`](#function)
* [`Functional programming`](#functional-programming)
* [`Functor`](#functor)
* [`Garbage collection`](#garbage-collection)
* [`Git`](#git)
* [`Higher-order function`](#higher-order-function)
* [`Hoisting`](#hoisting)
* [`HTML`](#html)
* [`HTTP and HTTPS`](#http-and-https)
* [`Integer`](#integer)
* [`Integration testing`](#integration-testing)
* [`IP`](#ip)
* [`jQuery`](#jquery)
* [`JSON`](#json)
* [`MDN`](#mdn)
* [`Module`](#module)
* [`MongoDB`](#mongodb)
* [`Mutable value`](#mutable-value)
* [`MVC`](#mvc)
* [`Node.js`](#nodejs)
* [`NoSQL`](#nosql)
* [`Npm`](#npm)
* [`Object-oriented programming`](#object-oriented-programming)
* [`Object`](#object)
* [`Prepared statements`](#prepared-statements)
* [`Promise`](#promise)
* [`Prototype-based programming`](#prototype-based-programming)
* [`Pseudo-class`](#pseudo-class)
* [`Pseudo-element`](#pseudo-element)
* [`PWA`](#pwa)
* [`React`](#react)
* [`Recursion`](#recursion)
* [`Regular expressions`](#regular-expressions)
* [`Repository`](#repository)
* [`Responsive web design`](#responsive-web-design)
* [`Scope`](#scope)
* [`Selector`](#selector)
* [`SEO`](#seo)
* [`Serialization`](#serialization)
* [`Shadow DOM`](#shadow-dom)
* [`SQL injection`](#sql-injection)
* [`SQL`](#sql)
* [`SSL`](#ssl)
* [`Stream`](#stream)
* [`Strict mode`](#strict-mode)
* [`String`](#string)
* [`SVG`](#svg)
* [`Template literals`](#template-literals)
* [`TypeScript`](#typescript)
* [`Unit testing`](#unit-testing)
* [`URI`](#uri)
* [`URL`](#url)
* [`UTF-8`](#utf-8)
* [`Value vs reference`](#value-vs-reference)
* [`Variable`](#variable)
* [`Viewport`](#viewport)
* [`Vue`](#vue)
* [`WebAssembly`](#webassembly)
* [`Web Components`](#web-components)
* [`WebGL`](#webgl)
* [`WebRTC`](#webrtc)
* [`WebSockets`](#websockets)
* [`XHTML`](#xhtml)
* [`XML`](#xml)
* [`Yarn`](#yarn)


### AJAX

Asynchronous JavaScript and XML (known as AJAX) is a term that describes a new approach to using multiple technologies together in order to enable web applications to make quick updates to the user interface without reloading the entire browser page.

### API

API stands for Application Programming Interface and is a set of features and rules provided by a provided by a software to enable third-party software to interact with it.
The code features of a web API usually include methods, properties, events or URLs.

### Argument

An argument is a value passed as an input to a function and can be either a primitive or an object.
In JavaScript, functions can also be passed as arguments to other functions.

### Array

Arrays are used to store multiple values in a single variable.
Arrays are ordered and each item in an array has a numeric index associated with it.
JavaScript arrays are zero-indexed, meaning the first element's index is 0.

### Asynchronous programming

Asynchronous programming is a way to allow multiple events to trigger code without waiting for each other.
The main benefits of asynchronous programming are improved application performance and responsiveness.

### Automatic semicolon insertion

Automatic semicolon insertion (ASI) is a JavaScript feature that allows developers to omit semicolons in their code.

### Boolean

Booleans are one of the primitive data types in JavaScript. 
They represent logical data values and can only be `true` or `false`.

### Callback

A callback function, also known as a high-order function, is a function that is passed into another function as an argument, which is then executed inside the outer function.
Callbacks can be synchronous or asynchronous.

### Character encoding

A character encoding defines a mapping between bytes and text, specifying how the sequenece of bytes should be interpreted.
Two commonly used character encodings are ASCII and UTF-8.

### Class

In object-oriented programming, a class is a template definition of an object's properties and methods.

### Closure

A closure is the combination of a function and the lexical environment within which that function was declared.
The closure allows a function to access the contents of that environment.

### CoffeeScript

CoffeeScript is a programming language inspired by Ruby, Python and Haskell that transpiles to JavaScript.

### Constant

A constant is a value, associated with an identifier.
The value of a constant can be accessed using the identifier and cannot be altered during execution.

### Constructor

In class-based object-oriented programming, a constructor is a special type of function called to instantiate an object.
Constructors often accept arguments that are commonly used to set member properties.

### Continuous Deployment

Continuous Deployment follows the testing that happens during Continuous Integration and pushes changes to a staging or production system. 
Continuous Deployment ensures that a version of the codebase is accessible at all times.

### Continuous Integration

Continuous Integration (CI) is the practice of testing each change done to a codebase automatically and as early as possible.
Two popular CI systems that integrate with GitHub are Travis CI and Circle CI.

### CORS

Cross-Origin Resource Sharing (known as CORS) is a mechanism that uses extra HTTP headers to tell a browser to let a web application running at one domain have permission to access resources from a server at a different domain.

### Cross-site scripting (XSS)

XSS refers to client-side code injection where the attacker injects malicious scripts into a legitimate website or web application. 
This is often achieved when the application does not validate user input and freely injects dynamic HTML content.

### CSS

CSS stands for Cascading Style Sheets and is a language used to style web pages.
CSS documents are plaintext documents structured with rules, which consist of element selectors and property-value pairs that apply the styles to the specified selectors.

### CSV

CSV stands for Comma-Separated Values and is a storage format for tabular data.
CSV documents are plaintext documents where each line represents a table row, with table columns separated by commas or some other delimiter (e.g. semicolons).
The first line of a CSV document sometimes consists of the table column headings for the data to follow.

### Currying

Currying is a way of constructing functions that allows partial application of a function's arguments.
Practically, this means that a function is broken down into a series of functions, each one accepting part of the arguments.

### Deserialization

Deserialization is the process of converting a format that has been transferred over a network and/or used for storage to an object or data structure.
A common type of deserialization in JavaScript is the conversion of JSON string into an object.

### DNS

A DNS (Domain Name System) translates domain names to the IP addresses needed to find a particular computer service on a network.

### DOM

The DOM (Document Object Model) is a cross-platform API that treats HTML and XML documents as a tree structure consisting of nodes. 
These nodes (such as elements and text nodes) are objects that can be programmatically manipulated and any visible changes made to them are reflected live in the document. 
In a browser, this API is available to JavaScript where DOM nodes can be manipulated to change their styles, contents, placement in the document, or interacted with through event listeners.

### Domain name registrar

A domain name registrar is a company that manages the reservation of internet domain names.
A domain name registrar must be approved by a general top-level domain (gTLD) registry or a country code top-level domain (ccTLD) registry.

### Domain name

A domain name is a website's address on the Internet, used primarily in URLs to identify the server for each webpage.
A domain name consists of a hierarchical sequence of names, separated by dots and ending with an extension.

### Element

A JavaScript representation of a DOM element commonly returned by `document.querySelector()` and `document.createElement()`. 
They are used when creating content with JavaScript for display in the DOM that needs to be programatically generated.

### ES6

ES6 stands for ECMAScript 6 (also known as ECMAScript 2015), a version of the ECMAScript specification that standardizes JavaScript.
ES6 adds a wide variety of new features to the specification, such as classes, promises, generators and arrow functions.

### Event-driven programming

Event-driven programming is a programming paradigm in which the flow of the program is determined by events (e.g. user actions, thread messages, sensor outputs).
In event-driven applications, there is usually a main loop that listens for events and trigger callback functions accordingly when one of these events is detected.

### Event loop

The event loop handles all asynchronous callbacks. 
Callbacks are queued in a loop, while other code runs, and will run one by one when the response for each one has been received.
The event loop allows JavaScript to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded.

### Express

Express is a backend framework, that provides a layer of fundamental web application features for Node.js.
Some of its key features are routing, middleware, template engines and error handling.

### Factory functions

In JavaScript, a factory function is any function, which is not a class or constructor, that returns a new object.
Factory functions don't require the use of the `new` keyword.

### First-class function

A programming language is said to have first-class functions if it treats them as first-class citizens, meaning they can be passed as arguments, be returned as values from other functions, be assigned to variables and stored in data structures.

### Flexbox

Flexbox is a one-dimensional layout model used to style websites as a property that could advance space distribution between items and provide powerful alignment capabilities.

### Function

Functions are self-contained blocks of code with their own scope, that can be called by other code and are usually associated with a unique identifier.
Functions accept input in the form of arguments and can optionally return an output (if no `return` statement is present, the default value of `undefined` will be returned instead). 
JavaScript functions are also objects.

### Functional programming

Functional programming is a paradigm in which programs are built in a declarative manner using pure functions that avoid shared state and mutable data. 
Functions that always return the same value for the same input and don't produce side effects are the pillar of functional programming.

### Functor

A Functor is a data type common in functional programming that implements a `map` method. 
The `map` method takes a function and applies it to the data in the Functor, returning a new instance of the Functor with the result.
JavaScript `Array`s are an example of the Functor data type.

### Garbage collection

Garbage collection is a form of automatic memory management.
It attempts to reclaim memory occupied by objects that are no longer used by the program.

### Git

Git is an open-source version control system, used for source code management.
Git allows users to copy (clone) and edit code on their local machines, before merging it into the main code base (master repository).

### Higher-order function

Higher-order functions are functions that either take other functions as arguments, return a function as a result, or both.

### Hoisting

Hoisting is JavaScript's default behavior of adding declarations to memory during the compile phase.
Hoisting allows for JavaScript variables to be used before the line they were declared on.

### HTML

HTML stands for HyperText Markup Language and is a language used to structure web pages.
HTML documents are plaintext documents structured with elements, which are surrounded by `<>` tags and optionally extended with attributes.

### HTTP and HTTPS

The HyperText Transfer Protocol (HTTP) is the underlying network protocol that enables transfer of hypermedia documents on the Web, usually between a client and a server.
The HyperText Transfer Protocol Secure (HTTPS) is an encrypted version of the HTTP protocol, that uses SSL to encrypt all data transfered between a client and a server.

### Integer

Integers are one of the primitive data types in Javascript.
They represent a numerical value that has no fractional component.

### Integration testing

Integration testing is a type of software testing, used to test groups of units/components of a software.
The purpose of integration tests are to validate that the units/components interact with each other as expected.

### IP

An IP address is a number assigned to a device connected to a network that uses the Internet protocol.
Two IP versions are currently in use - IPv4, the older version of the communication protocol (e.g. 192.168.1.100) and IPv6, the newest version of the communication protocol which allows for many different IP addresses (e.g. 0:0:0:0:ffff:c0a8:164).

### jQuery

jQuery is a frontend JavaScript library, that simplifies DOM manipulation, AJAX calls and Event handling.
jQuery uses its globally defined function, `$()`, to select and manipulate DOM elements.

### JSON

JSON (JavaScript Object Notation) is a format for storing and exchanging data.
It closely resembles the JavaScript object syntax, however some data types, such as dates and functions, cannot be natively represented and need to be serialized first.

### MDN

MDN Web Docs, formerly known as Mozilla Developer Network, is the official Mozilla website for development documentation of web standards and Mozilla projects.

### Module

Modules are independent, self-contained pieces of code that can be incorporated into other pieces of code.
Modules improve maintainability and reusability of the code.

### MongoDB

MongoDB is a NoSQL database model that stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time

### Mutable value

Mutable value is a type of variable that can be changed once created.
Objects are mutable as their state can be modified after they are created.
Primitive values are not mutable as we perform reassignment once we change them.

### MVC

MVC stands for Model-View-Controller and is a software design pattern, emphasizing separation of concerns (logic and display).
The Model part of the MVC pattern refers to the data and business logic, the View handles the layout and display, while the Controller routes commands to the model and view parts.

### Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
Node.js can execute JavaScript code outside of the browser and can be used to develop web backends or standalone applications.

### NoSQL

NoSQL databases provide a mechanism to create, update, retrieve and calculate data that is stored in models that are non-tabular.

### Npm

Npm is a package manager for the JavaScript programming language and the default package manager for Node.js.
It consists of a command-line client and the npm registry, an online database of packages.

### Object-oriented programming

Object-oriented programming (OOP) is a programming paradigm based on the concept of objects, which may contain both data and procedures which can be use to operate on them.
JavaScript supports Object-oriented programming both via prototypes and classes.

### Object

Objects are data structures that contain data and instructions for working with the data.
Objects consist of key-value pairs, where the keys are alphanumeric identifiers and the values can either be primitives or objects.
JavaScript functions are also objects.

### Prepared statements

In databases management systems, prepared statements are templates that can be used to execute queries with the provided values substituting the template's parameters.
Prepared statements offer many benefits, such as reusability, maintainability and higher security.

### Promise

The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
A Promise can be in one of these states: pending(initial state, neither fulfilled nor rejected), fulfilled(operation completed successfully), rejected(operation failed).

### Prototype-based programming

Prototype-based programming is a style of object-oriented programming, where inheritance is based on object delegation, reusing objects that serve as prototypes.
Prototype-based programming allows the creation of objects before defining their classes.

### Pseudo-class

In CSS, a pseudo-class is used to define a special state of an element and can be used as a selector in combination with an id, element or class selector.

### Pseudo-element

In CSS, a pseudo-element is used to style specific parts of an element and can be used as a selector in combination with an id, element or class selector.

### PWA

Progressive Web App (known as PWA) is a term used to describe web applications that load like regular websites but can offer the user functionality such as working offline, push notifications, and device hardware access that were traditionally available only to native mobile applications.

### React

React is a frontend framework, that allows developers to create dynamic, component-based user interfaces.
React separates view and state, utilizing a virtual DOM to update the user interface.

### Recursion

Recursion is the repeated application of a process. 
In JavaScript, recursion involves functions that call themselves repeatedly until they reach a base condition. 
The base condition breaks out of the recursion loop because otherwise the function would call itself indefinitely. 
Recursion is very useful when working with nested data, especially when the nesting depth is dynamically defined or unkown.

### Regular expressions

Regular expressions (known as regex or regexp) are patterns used to match character combinations in strings.
JavaScript provides a regular expression implementation through the `RegExp` object.

### Repository

In a version control system, a repository (or repo for short) is a data structure that stores metadata for a set of files (i.e. a project).

### Responsive web design

Responsive web design is a web development concept aiming to provide optimal behavior and performance of websites on all web-enabled devices.
Responsive web design is usually coupled with a mobile-first approach.

### Scope

Each function has its own scope, and any variable declared within that function is only accessible from that function and any nested functions.

### Selector

A CSS selector is a pattern that is used to select and/or style one or more elements in a document, based on certain rules.
The order in which CSS selectors apply styles to elements is based on the rules of CSS specificity.

### SEO

SEO stands for Search Engine Optimization and refers to the process of improving a website's search rankings and visibility.

### Serialization

Serialization is the process of converting an object or data structure into a format suitable for transfer over a network and/or storage.
A common type of serialization in JavaScript is the conversion of an object into a JSON string.

### Shadow DOM

Shadow DOM allows you to attach hidden DOM trees to elements in the normal DOM tree, which are included in the document rendering, but excluded from the main document DOM tree. 
A shadow DOM tree will start with a shadow root, to which you can attach any elements you want, just like in a regular DOM.
Examples of shadow DOM uses are the `<video>`/`<audio>` elements and the simple `<input type="range">` element.

### SQL injection

SQL injection is a code injection technique, used to attack data-driven applications.
SQL injections get their name from the SQL language and mainly target data stored in relational databases.

### SQL

SQL stands for Structured Query Language and is a language used to create, update, retrieve and calculate data in table-based databases.
SQL databases use a relational database model and are particularly useful in handlind structured data with relations between different entities.

### SSL

Secure Sockets Layer, commonly known as SSL or TLS, is a set of protocols and standards for transferring private data across the Internet.
SSL uses a cryptographic system that uses two keys to encrypt data.

### Stream

A stream is a sequence of data made available over time, often due to network transmission or storage access times.

### Strict mode

JavaScript's strict mode is a JavaScript feature that allows developers to use a more restrictive variant of JavaScript and it can be enabled by adding `'use strict';` at the very top of their code.
Strict mode elimiated some silent errors, might improve performance and changes the behavior of `eval` and `arguments` among other things.

### String

Strings are one of the primitive data types in JavaScript.
They are sequences of characters and are used to represent text.

### SVG

SVG stands for Scalable Vector Graphics and is a 2D vector image format based on an XML syntax.
SVG images can scale infinitely and can utilize clipping, masking, filters, animations etc.

### Template literals

Template literals are strings that allow embedded expressions.
They support multi-line strings, expression interpolation and nesting.

### TypeScript

TypeScript is a superset of JavaScript, adding optional static typing to the language.
TypeScript compiles to plain JavaScript.

### Unit testing

Unit testing is a type of software testing, used to test individual units/components of a software.
The purpose of unit tests are to validate that each individual unit/component performs as designed.

### URI

URI stands for Uniform Resource Identifier and is a text string referring to a resource.
A common type of URI is a URL, which is used for the identification of resources on the Web.

### URL

URL stands for Uniform Resource Locator and is a text string specifying where a resource can be found on the Internet.
In the HTTP protocol, URLs are the same as web addresses and hyperlinks.

### UTF-8

UTF-8 stands for UCS Transformation Format 8 and is a commonly used character encoding.
UTF-8 is backwards compatible with ASCII and can represent any standard Unicode character.

### Value vs reference

When passing a variable by value, a copy of the variable is made, meaning that any changes made to the contents of the variable will not be reflected in the original variable.
When passing a variable by reference, the memory address of the actual variable is passed to the function or variable, meaning that modifying the variable's contents will be reflected in the original variable.
In JavaScript primitive data types are passed by value while objects are passed by reference.

### Variable

A variable is a storage location, associated with an identifier and containing a value.
The value of a variable can be referred using the identifier and can be altered during execution.

### Viewport

A viewport is a polygonal (usually rectangular) area in computer graphics that is currently being viewed.
In web development and design, it refers to the visible part of the document that is being viewed by the user in the browser window.

### Vue

Vue.js is a progressive frontend framework for building user interfaces.
Vue.js separates view and state, utilizing a virtual DOM to update the user interface.

### WebAssembly

WebAssembly (WA) is a web standard that defines an assembly-like text format and corresponding binary format for executalbe code in web pages.
WebAssembly is meant to complement JavaScript and improve its performance to match native code performance.

### Web Components

Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use on web pages and apps.
Building custom components using these standards means that you can use them across modern browsers regardless of any JavaScript library or framework.

### WebGL

WebGL stands for Web Graphics Library and is a JavaScript API that can be used for drawing interactive 2D and 3D graphics.
WebGL is based on OpenGL and can be invoked within HTML `<canvas>` elements, which provide a rendering surface.

### WebRTC

WebRTC  stands for Web Real-Time Communication and is an API that can be used for video-chat, voice-calling and P2P-file-sharing web apps.

### WebSockets

WebSockets is a protocol that allows for a persistent client-server TCP connection.
The WebSocket protocol uses lower overheads, facilitating real-time data transfer between client and server.

### XHTML

XHTML stands for EXtensible HyperText Markup Language and is a language used to structure web pages.
XHTML is a reformulation of the HTML document structure as an application of XML.

### XML

XML stands for eXtensible Markup Language and is a generic markup language specified by the W3C. 
XML documents are plaintext documents structured with user-defined tags, surrounded by `<>` and optionally extended with attributes.

### Yarn

Yarn is a package manager made by Facebook. 
It can be used as an alternative to the npm package manager and is compatible with the public NPM registry.
