'use strict'

var schema = require('property-information/svg')
var factory = require('./factory')

var svg = factory(schema, 'g')
svg.displayName = 'svg'

module.exports = svg
