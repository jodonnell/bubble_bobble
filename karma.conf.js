// Karma configuration
module.exports = function(config) {
    config.set({
        // ... normal karma configuration
        frameworks: ['jasmine', 'sinon'],

        files: [
            {pattern: 'assets/*.png', watched: false, included: false, served: true, nocache: false},
            {pattern: 'spec/spec_helper.js', watched: false},
            {pattern: 'spec/*_spec.js', watched: false},
            {pattern: 'spec/**/*_spec.js', watched: false}
        ],

        preprocessors: {
            'spec/spec_helper.js': ['webpack'],
            'spec/*_spec.js': ['webpack'],
            'spec/**/*_spec.js': ['webpack']
        },

        proxies: {
            "/assets/": "http://localhost:9876/base/assets/"
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        }
    });
};
