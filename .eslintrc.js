module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4,
            {"ObjectExpression": "first"}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "eqeqeq": ["error", "always"],
        "no-useless-return": 2,
        "no-useless-escape": 2,
        "camelcase": 2,
        "no-var": 2
    },
    "globals": {
        "gameContext": false,
        "gameImages": false,
        "sinon": false
    },
     "parserOptions": {
        "sourceType": "module",
    }

};
