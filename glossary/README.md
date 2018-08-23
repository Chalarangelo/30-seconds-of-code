# 30-seconds-of-code JavaScript Glossary

## Table of Contents

* [`Argument`](#argument)
* [`Array`](#array)
* [`Boolean`](#boolean)
* [`Callback`](#callback)
* [`Constant`](#constant)
* [`Cross-site scripting (XSS)`](#cross-site-scripting-xss)
* [`Currying`](#currying)
* [`DNS`](#dns)
* [`DOM`](#dom)
* [`Domain name`](#domain-name)
* [`Element`](#element)
* [`ES6`](#es6)
* [`Event loop`](#event-loop)
* [`Express`](#express)
* [`Function`](#function)
* [`Functional programming`](#functional-programming)
* [`Functor`](#functor)
* [`Git`](#git)
* [`HTML`](#html)
* [`HTTP and HTTPS`](#http-and-https)
* [`IP`](#ip)
* [`JSON`](#json)
* [`Npm`](#npm)
* [`Object-oriented programming`](#object-oriented-programming)
* [`Promise`](#promise)
* [`React`](#react)
* [`Recursion`](#recursion)
* [`Regular expressions`](#regular-expressions)
* [`Repository`](#repository)
* [`Selector`](#selector)
* [`String`](#string)
* [`Template literals`](#template-literals)
* [`Value vs reference`](#value-vs-reference)
* [`Variable`](#variable)
* [`Yarn`](#yarn)


### Argument

An argument is a value passed as an input to a function and can be either a primitive or an object.
In JavaScript, functions can also be passed as arguments to other functions.

### Array

Arrays are used to store multiple values in a single variable.
Arrays are ordered and each item in an array has a numeric index associated with it.
JavaScript arrays are zero-indexed, meaning the first element's index is 0.

### Boolean

Booleans are one of the primitive data types in JavaScript. 
They represent logical data values and can only be `true` or `false`.

### Callback

A callback function, also known as a high-order function, is a function that is passed into another function as an argument, which is then executed inside the outer function.
Callbacks can be synchronous or asynchronous.

### Constant

A constant is a value, associated with an identifier.
The value of a constant can be accessed using the identifier and cannot be altered during execution.

### Cross-site scripting (XSS)

XSS refers to client-side code injection where the attacker injects malicious scripts into a legitimate website or web application. 
This is often achieved when the application does not validate user input and freely injects dynamic HTML content.

### Currying

Currying is a way of constructing functions that allows partial application of a function's arguments.
Practically, this means that a function is broken down into a series of functions, each one accepting part of the arguments.

### DNS

A DNS (Domain Name System) translates domain names to the IP addresses needed to find a particular computer service on a network.

### DOM

The DOM (Document Object Model) is a cross-platform API that treats HTML and XML documents as a tree structure consisting of nodes. 
These nodes (such as elements and text nodes) are objects that can be programmatically manipulated and any visible changes made to them are reflected live in the document. 
In a browser, this API is available to JavaScript where DOM nodes can be manipulated to change their styles, contents, placement in the document, or interacted with through event listeners.

### Domain name

A domain name is a website's address on the Internet, used primarily in URLs to identify the server for each webpage.
A domain name consists of a hierarchical sequence of names, separated by dots and ending with an extension.

### Element

A JavaScript representation of a DOM element commonly returned by `document.querySelector()` and `document.createElement()`. 
They are used when creating content with JavaScript for display in the DOM that needs to be programatically generated.

### ES6

ES6 stands for ECMAScript 6 (also known as ECMAScript 2015), a version of the ECMAScript specification that standardizes JavaScript.
ES6 adds a wide variety of new features to the specification, such as classes, promises, generators and arrow functions.

### Event loop

The event loop handles all asynchronous callbacks. 
Callbacks are queued in a loop, while other code runs, and will run one by one when the response for each one has been received.
The event loop allows JavaScript to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded.

### Express

Express is a backend framework, that provides a layer of fundamental web application features for Node.js.
Some of its key features are routing, middleware, template engines and error handling.

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

### Git

Git is an open-source version control system, used for source code management.
Git allows users to copy (clone) and edit code on their local machines, before merging it into the main code base (master repository).

### HTML

HTML stands for HyperText Markup Language and is a language used to structure web pages.
HTML documents are plaintext documents structured with elements, which are surrounded by `<>` tags and optionally extended with attributes.

### HTTP and HTTPS

The HyperText Transfer Protocol (HTTP) is the underlying network protocol that enables transfer of hypermedia documents on the Web, usually between a client and a server.
The HyperText Transfer Protocol Secure (HTTPS) is an encrypted version of the HTTP protocol, that uses SSL to encrypt all data transfered between a client and a server.

### IP

An IP address is a number assigned to a device connected to a network that uses the Internet protocol.
Two IP versions are currently in use - IPv4, the older version of the communication protocol (e.g. 192.168.1.100) and IPv6, the newest version of the communication protocol which allows for many different IP addresses (e.g. 0:0:0:0:ffff:c0a8:164).

### JSON

JSON (JavaScript Object Notation) is a format for storing and exchanging data.
It closely resembles the JavaScript object syntax, however some data types, such as dates and functions, cannot be natively represented and need to be serialized first.

### Npm

Npm is a package manager for the JavaScript programming language and the default package manager for Node.js.
It consists of a command-line client and the npm registry, an online database of packages.

### Object-oriented programming

Object-oriented programming (OOP) is a programming paradigm based on the concept of objects, which may contain both data and procedures which can be use to operate on them.
JavaScript supports Object-oriented programming both via prototypes and classes.

### Promise

The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
A Promise can be in one of these states: pending(initial state, neither fulfilled nor rejected), fulfilled(operation completed successfully), rejected(operation failed).

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

### Selector

A CSS selector is a pattern that is used to select and/or style one or more elements in a document, based on certain rules.
The order in which CSS selectors apply styles to elements is based on the rules of CSS specificity.

### String

Strings are one of the primitive data types in JavaScript.
They are sequences of characters and are used to represent text.

### Template literals

Template literals are strings that allow embedded expressions.
They support multi-line strings, expression interpolation and nesting.

### Value vs reference

When passing a variable by value, a copy of the variable is made, meaning that any changes made to the contents of the variable will not be reflected in the original variable.
When passing a variable by reference, the memory address of the actual variable is passed to the function or variable, meaning that modifying the variable's contents will be reflected in the original variable.
In JavaScript primitive data types are passed by value while objects are passed by reference.

### Variable

A variable is a storage location, associated with an identifier and containing a value.
The value of a variable can be referred using the identifier and can be altered during execution.

### Yarn

Yarn is a package manager made by Facebook. 
It can be used as an alternative to the npm package manager and is compatible with the public NPM registry.
