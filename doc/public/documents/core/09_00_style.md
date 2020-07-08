## 代码风格

### 一、简述

我们使用Eslint + Prettier来统一团队代码风格，有疑虑可以再讨论，~~虚心接受，但坚决不改~~。

### 二、你要做的事情

#### 1. IDE 插件

看到这一章，相信你已经完成了IDE安装与开发环境搭建，~~这里默认你的IDE是VSCode，因为我们都是用VSCode~~，接下来你可以按照以下的配置，配置你的IDE。

![](/documents/assets/style_01.png) 

如上图所示，你要安装这些插件，最重要的是**Vuter、Prettier与Eslint**，其他的按照你的喜好安装即可。

#### 2. IDE 配置

IDE的配置，已经上传到gitlab，clone代码后会一并下载，并且自动生效，不需要你做额外的配置，如下图所示。

![](/documents/assets/style_02.png) 

当然，你可以修改一些个性化的设置，比如说颜色主题和文件夹图标主题，**注意不要提交就好了。**

#### 3. 如何格式化代码

做完上面的IDE配置后，就可以正常开发了，Eslint与Prettier不需要你做额外的配置，格式化代码分成两种方法。

* 快捷键格式化法

主要在开发过程中使用，使用 SHIFT + ALT + F  进行单文件的代码格式化，~~解决看着不爽的问题~~，具体的效果如下图所示。

![](/documents/assets/style_03.gif) 

* 命令格式化法

快捷格式化法可以解决单文件的问题，但是文件太多，就比较心累。所以开发了代码格式化服务，并提供了npm scripts 方便的调用。

``` bash
npm run format // 格式化框架代码
npm run format:global // 格式化框架代码
npm run format:app app=[项目名] // 格式化 apps 目录下单个项目代码
npm run format:dir dir=[目录或者文件] // 格式化指定的目录或者文件
```

#### 4. 典型的场景

功能特性开发|缺陷修复完成后，准备push，发现有很多eslint的警告和错误，如下图所示。

![](/documents/assets/style_04.png) 

此时，需要将警告和错误都处理掉，才可以push代码。使用“命令格式化法”对代码进行格式化，如下图所示。

![](/documents/assets/style_05.png) 

等待格式化完成后，就没有警告和错误了，如下图所示 ~~强迫症舒了一口气~~。

![](/documents/assets/style_06.png) 

现在没有强制push的时候需要进行代码格式化，~~后续应该会加上~~，主要靠自身的习惯，**自己的代码要自己负责，保证项目代码的质量。**


### 三、附录

备份一下VSCode配置、Prettier与Eslint的配置。
```js
// setting.json
{
    "workbench.iconTheme": "vscode-great-icons",
    "terminal.integrated.shell.windows": "C:\\windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "editor.cursorStyle": "block",
    "editor.cursorBlinking": "solid",
    "editor.find.autoFindInSelection": true,
    "editor.fontLigatures": true,
    "editor.fontWeight": "100",
    "editor.fontFamily": "Consolas, '微软雅黑'",
    "editor.tabSize": 4,
    "editor.formatOnPaste": true,
    "workbench.enableExperiments": false,
    "workbench.colorTheme": "One Dark Pro Bold",
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatter.css": "prettier",
    "vetur.format.defaultFormatter.postcss": "prettier",
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    "vetur.format.defaultFormatter.ts": "vscode-typescript",
    "vetur.format.defaultFormatterOptions": {
        "prettyhtml": {
            "printWidth": 120,
            "wrapAttributes": false,
            "sortAttributes": false,
            "tabWidth": 4,
            "jsxBracketSameLine": true
        },
        "prettier": {
            "semi": true,
            "printWidth": 120
        }
    },
    "vetur.experimental.templateInterpolationService": false,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": ["html", "vue", "javascript"]
    },
    "prettier.singleQuote": true,
    "prettier.tabWidth": 4
}
```

``` js
// .eslintrc.js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        'standard',
        'plugin:vue/essential',
        'plugin:prettier/recommended'
    ],
    plugins: ['prettier', 'vue'],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    rules: {
        'prettier/prettier': 1
        // 重置的规则写在这里
    }
};
```

```js
// .prettier.config.js
module.exports = {
    printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, //一个tab代表几个空格数
    useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
    semi: true, //行位是否使用分号，默认为true
    trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    // parser: 'vue', //代码的解析引擎，默认为babylon，与babel相同，这一部分去掉，特别指定会有问题。
    jsxBracketSameLine: false, // 主要是Vue</tag>的代码风格
    jsxSingleQuote: true, // template使用""，jsu使用''
    proseWrap: 'never'
};

```

