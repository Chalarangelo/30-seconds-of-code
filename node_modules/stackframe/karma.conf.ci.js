module.exports = function(config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    // Check out https://saucelabs.com/platforms for all browser/platform combos
    var customLaunchers = {
        slIOS8: {
            base: 'SauceLabs',
            browserName: 'iPhone',
            platform: 'OS X 10.10',
            version: '8.4'
        },
        slIOS9: {
            base: 'SauceLabs',
            browserName: 'iPhone',
            platform: 'OS X 10.11',
            version: '9.2'
        },
        // *Sigh* Cannot get this working with appium or selenium...
        // slIOS10: {
        //     base: 'SauceLabs',
        //     browserName: 'iPhone',
        //     platform: 'macOS 10.12',
        //     version: '10.2'
        // },
        slAndroid4: {
            base: 'SauceLabs',
            browserName: 'Android',
            platform: 'Linux',
            version: '4.4'
        },
        slAndroid5: {
            base: 'SauceLabs',
            browserName: 'Android',
            platform: 'Linux',
            version: '5.1'
        },
        slAndroid6: {
            base: 'SauceLabs',
            browserName: 'Android',
            platform: 'Linux',
            version: '6.0'
        },
        slChrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        },
        slChromeBeta: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'beta'
        },
        slFirefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        },
        slFirefoxBeta: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'beta'
        },
        slSafari8: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.10',
            version: '8.0'
        },
        slSafari9: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '9.0'
        },
        slSafari10: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'macOS 10.12',
            version: '10.0'
        },
        slOpera: {
            base: 'SauceLabs',
            browserName: 'opera'
        },
        slEdge14: {
            base: 'SauceLabs',
            browserName: 'microsoftedge',
            platform: 'Windows 10',
            version: '14.14393'
        },
        slEdge13: {
            base: 'SauceLabs',
            browserName: 'microsoftedge',
            platform: 'Windows 10',
            version: '13.10586'
        },
        slIE11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        slIE10: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8',
            version: '10'
        },
        slIE9: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '9.0'
        }
        // Too unreliable on Sauce :(
        // slIE8: {
        //     base: 'SauceLabs',
        //     browserName: 'internet explorer',
        //     platform: 'Windows XP',
        //     version: '8.0'
        // }
        //slIE7: {
        //    base: 'SauceLabs',
        //    browserName: 'internet explorer',
        //    platform: 'Windows XP',
        //    version: '7'
        //}
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'stackframe.js',
            'spec/*-spec.js'
        ],
        exclude: [],
        port: 9876,
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 240000,
        captureTimeout: 240000,
        sauceLabs: {
            testName: 'stackframe unit tests',
            recordScreenshots: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            }
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['dots', 'saucelabs', 'coverage'],
        preprocessors: {
            'stackframe.js': 'coverage'
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage'
        },
        singleRun: true
    });
};
