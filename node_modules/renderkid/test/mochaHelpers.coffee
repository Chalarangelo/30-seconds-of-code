chai = require('chai')

chai
.use(require 'chai-fuzzy')
.use(require 'chai-changes')
.use(require 'sinon-chai')
.should()

global.expect = chai.expect
global.sinon = require 'sinon'