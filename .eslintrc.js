module.exports = {
    "env": {
        "browser": true,
        "es6": true
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
        "eqeqeq": ["error", "always"]
    },
    "globals": {
        "gameContext": false,
        "gameImages": false
    },
     "parserOptions": {
        "sourceType": "module",
    }

};
