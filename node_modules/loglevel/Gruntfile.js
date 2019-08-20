'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %>' +
                ' - <%= pkg.homepage %>' +
                ' - (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                ' - licensed <%= pkg.license %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            requirejs: {
                src: [],
                options: {
                    specs: 'test/*-test.js',
                    vendor: 'test/vendor/*.js',
                    helpers: 'test/*-helper.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            },
            global: {
                src: 'lib/**/*.js',
                options: {
                    specs: 'test/global-integration.js',
                    vendor: 'test/vendor/*.js'
                }
            },
            context: {
                src: 'test/test-context-using-apply.generated.js',
                options: {
                    specs: 'test/global-integration-with-new-context.js',
                    vendor: 'test/vendor/*.js'
                }
            },
            withCoverage: {
                src: 'lib/**/*.js',
                options: {
                    specs: 'test/*-test.js',
                    vendor: 'test/vendor/*.js',
                    helpers: 'test/*-helper.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'coverage'
                                }
                            },
                            {
                                type: 'lcov',
                                options: {
                                    dir: 'coverage'
                                }
                            }
                        ],

                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: {
                                paths: {
                                    "lib": '.grunt/grunt-contrib-jasmine/lib/'
                                }
                            }
                        }
                    }
                }
            }
        },
        "jasmine_node": {
            options: {
                match: "node-integration.",
                matchall: true,
                projectRoot: "./test",
                useHelpers: false
            }
        },
        coveralls: {
            src: 'coverage/lcov.info'
        },
        open: {
            jasmine: {
                path: 'http://127.0.0.1:8000/_SpecRunner.html'
            }
        },
        connect: {
            test: {
                port: 8000,
                keepalive: true
            }
        },
        'saucelabs-jasmine': {
            // Requires valid SAUCE_USERNAME and SAUCE_ACCESS_KEY in env to run.
            all: {
                options: {
                    urls: ['http://localhost:8000/_SpecRunner.html'],
                    browsers: [
                        {"browserName": "firefox", "platform": "Windows 2003", "version": "3.6"},
                        {"browserName": "firefox", "platform": "Windows 2003", "version": "4"},
                        {"browserName": "firefox", "platform": "Windows 2003", "version": "25"},
                        {"browserName": "safari", "platform": "Mac 10.6", "version": "5"},
                        {"browserName": "safari", "platform": "Mac 10.8", "version": "6"},
                        {"browserName": "googlechrome", "platform": "Windows 7"},
                        {"browserName": "opera", "platform": "Windows 2003", "version": "12"},
                        // Disabled because old IE breaks the Jasmine runner; these have to be manually tested
                        // {"browserName": "iehta", "platform": "Windows XP", "version": "6"},
                        // {"browserName": "iehta", "platform": "Windows XP", "version": "7"},
                        // {"browserName": "iehta", "platform": "Windows XP", "version": "8"},
                        {"browserName": "iehta", "platform": "Windows 7", "version": "9"},
                        {"browserName": "iehta", "platform": "Windows 7", "version": "10"},
                        {"browserName": "opera", "platform": "Windows 7", "version": "12"},
                        {"browserName": "android", "platform": "Linux", "version": "4.0"},
                        {"browserName": "iphone", "platform": "OS X 10.8", "version": "6"}
                    ],
                    concurrency: 3,
                    detailedError: true,
                    testTimeout:10000,
                    testInterval:1000,
                    testReadyTimeout:2000,
                    testname: 'loglevel jasmine test',
                    tags: [process.env.TRAVIS_REPO_SLUG || "local", process.env.TRAVIS_COMMIT || "manual"]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: ['lib/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/*.js', '!test/*.generated.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'test']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'test']
            }
        },
        qunit: {
            all: ['test/*-qunit.html']
        },
        preprocess: {
            "test-context-using-apply": {
                src: 'test/test-context-using-apply.js',
                dest: 'test/test-context-using-apply.generated.js'
            }
        },
        clean:{
            test:['test/test-context-using-apply.generated.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Build a distributable release
    grunt.registerTask('dist', ['test', 'concat', 'uglify']);

    // Check everything is good
    grunt.registerTask('test', ['jshint', 'jasmine:requirejs', 'jasmine:global', 'preprocess', 'jasmine:context', 'clean:test', 'jasmine_node', 'jasmine:withCoverage', 'qunit']);

    // Test with a live server and an actual browser
    grunt.registerTask('integration-test', ['jasmine:requirejs:src:build', 'open:jasmine', 'connect:test:keepalive']);

    // Test with lots of browsers on saucelabs. Requires valid SAUCE_USERNAME and SAUCE_ACCESS_KEY in env to run.
    grunt.registerTask('saucelabs', ['jasmine:requirejs:src:build', 'connect:test', 'saucelabs-jasmine']);

    // Default task.
    grunt.registerTask('default', 'test');
    grunt.registerTask('ci', ['test', 'coveralls']);

};
