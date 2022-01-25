module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 10,
        "sourceType": 'module'
    },
    "rules": {
        'space-before-function-paren': ['error', 'never']
    }
}
