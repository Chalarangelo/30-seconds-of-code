'use strict';

var expect = require('expect.js');
var commandExists = require('..');
var commandExistsSync = commandExists.sync;
var isUsingWindows = process.platform == 'win32'

describe('commandExists', function(){
    describe('async - callback', function() {
        it('it should find a command named ls or dir', function(done){
            var commandToUse = 'ls'
            if (isUsingWindows) {
                commandToUse = 'dir'
            }

            commandExists(commandToUse, function(err, exists) {
                expect(err).to.be(null);
                expect(exists).to.be(true);
                done();
            });
        });

        it('it should not find a command named fdsafdsafdsafdsafdsa', function(done){
            commandExists('fdsafdsafdsafdsafdsa', function(err, exists) {
                expect(err).to.be(null);
                expect(exists).to.be(false);
                done();
            });
        });
    });

    describe('async - promise', function() {
        it('it should find a command named ls or dir', function(done){
            var commandToUse = 'ls'
            if (isUsingWindows) {
                commandToUse = 'dir'
            }

            commandExists(commandToUse)
            .then(function(command) {
                expect(command).to.be(commandToUse);
                done();
            });
        });

        it('it should not find a command named fdsafdsafdsafdsafdsa', function(done){
            commandExists('fdsafdsafdsafdsafdsa')
            .then(function() {
                // We should not execute this line.
                expect(true).to.be(false);
            })
            .catch(function() {
                done();
            });
        });
    });

    describe('sync', function() {
        it('it should find a command named ls or dir', function(){
            var commandToUse = 'ls'
            if (isUsingWindows) {
                commandToUse = 'dir'
            }
            expect(commandExistsSync(commandToUse)).to.be(true);
        });

        it('it should not find a command named fdsafdsafdsafdsafdsa', function(){
            expect(commandExistsSync('fdsafdsafdsafdsafdsa')).to.be(false);
        });

        it('it should not find a command named ls or dir prefixed with some nonsense', function(){
            var commandToUse = 'fdsafdsa ls'
            if (isUsingWindows) {
                commandToUse = 'fdsafdsaf dir'
            }
            expect(commandExistsSync(commandToUse)).to.be(false);
        });

        it('it should not execute some nefarious code', function(){
            expect(commandExistsSync('ls; touch /tmp/foo0')).to.be(false);
        });

        it('it should not execute some nefarious code', function(){
            expect(commandExistsSync('ls touch /tmp/foo0')).to.be(false);
        });
    });

    describe('local file', function() {
        it('it should report false if there is a non-executable file with that name', function(done) {
            var commandToUse = 'test/non-executable-script.js'
            commandExists(commandToUse)
                .then(function(command){
                    // We should not execute this line.
                    expect(true).to.be(false);
                }).catch(function(err){
                    expect(err).to.be(null);
                    done();
                });
        });


        if (!isUsingWindows) {
            it('it should report true if there is an executable file with that name', function(done) {
                var commandToUse = 'test/executable-script.js'
                commandExists(commandToUse)
                    .then(function(command){
                        // We should not execute this line.
                        expect(command).to.be(commandToUse);
                        done();
                    });
            });
        }

        if (isUsingWindows) {
            it('it should report true if there is an executable file with that name', function(done) {
                var commandToUse = 'test\\executable-script.cmd'
                commandExists(commandToUse)
                    .then(function(command){
                        expect(command).to.be(commandToUse);
                        done();
                    });
            });

            it('it should report false if there is a double quotation mark in the file path', function() {
                var commandToUse = 'test\\"executable-script.cmd'
                expect(commandExists.sync(commandToUse)).to.be(false);
            });
        }
    });
});
