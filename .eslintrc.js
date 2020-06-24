module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'vue'],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    rules: {
        'prettier/prettier': 1
        // 重置的规则写在这里
        // 不允许在语句后存在多余的空格
        // "no-trailing-spaces": ["error", {
        //     // 不允许在语句后存在多余的空格
        //     "skipBlankLines": false,
        //     // 但是忽略注释的末尾的多余空格
        //     "ignoreComments": true
        // }]
    }
};
