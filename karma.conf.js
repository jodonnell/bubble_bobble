// Karma configuration
module.exports = function(config) {
    config.set({
        // ... normal karma configuration
        frameworks: ['jasmine'],

        files: [
            {pattern: 'assets/*.png', watched: false, included: false, served: true, nocache: false},
            {pattern: 'spec/spec_helper.js', watched: false},
            {pattern: 'spec/*_spec.js', watched: false},
            {pattern: 'spec/**/*_spec.js', watched: false}
        ],

        preprocessors: {
            'spec/spec_helper.js': ['webpack'],
            'spec/*_spec.js': ['webpack', 'sourcemap'],
            'spec/**/*_spec.js': ['webpack', 'sourcemap']
        },

        reporters: [ 'dots' ],

        proxies: {
            "/assets/": "http://localhost:9876/base/assets/"
        },


        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            devtool: 'inline-source-map'
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        }
    });
};
