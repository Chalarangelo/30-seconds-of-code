var webpackConfig = require('./webpack.config.js');

module.exports = function (karma) {
    karma.set({
        plugins: ['karma-webpack', 'karma-chai', 'karma-sinon', 'karma-mocha', 'karma-phantomjs-launcher'],

        frameworks: ['chai', 'sinon', 'mocha'],

        files: [
            'src/**/*.js',
            'test/**/*.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js'
        ],

        preprocessors: {
            'src/**/*.js': ['webpack'],
            'test/**/*.js': ['webpack']
        },

        webpack: {
            module: webpackConfig.module,
            plugins: webpackConfig.plugins
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        browsers: ['PhantomJS']
    });
};
