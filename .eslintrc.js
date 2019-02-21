module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["standard", "plugin:vue/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "parser": "babel-eslint",
        "ecmaVersion": 8
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // 总是使用 === 或 !==
        "eqeqeq": ["error", "always"],
        // 禁止使用var定义变量
        "no-var": 2,
        // 缩进强制使用4个空格
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        // 强制使用分号
        "semi": ["error", "always"],
        // 强制分号要出现在句子末尾不能换行
        "semi-style": ["error", "last"],
        // 强制分号之后有空格，禁止分号之前有空格
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        // 强制要求块语句和类的开始或末尾不要有空行
        "padded-blocks": ["error", "never"],
        // 强制要求函数的的左括号前不能有空格
        "space-before-function-paren": ["error", "never"],
        // 不允许在语句后存在多余的空格
        "no-trailing-spaces": ["error", {
            // 不允许在语句后存在多余的空格
            "skipBlankLines": false,
            // 但是忽略注释的末尾的多余空格
            "ignoreComments": true
        }],
        // 注释样式规则
        "spaced-comment": ["error",
            // // 或 /* 必须跟随至少一个空白
            "always"
        ],
        // 强制在花括号中使用一致的空格
        "object-curly-spacing": ["error", "always"],
        // 强制文件末尾不要有换行符
        "eol-last": ["error", "never"],
        "quotes": ["error", "single"]
    }
};