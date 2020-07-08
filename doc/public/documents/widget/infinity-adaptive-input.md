### 如何使用自适应的input输入框

#### 1、导入并注册该组件

```js
    import utils from '@utils';
    import notificator from '@core/notificator';
    import infinityAdaptiveInput from '@vBaseComponent/infinity-adaptive-input/index.vue';

    export default {
        data() {
            return {
                fields: [{
                    label: '用户id',
                    name: 'uid',
                    type: 'number'
                }, {
                    label: '姓名',
                    name: 'name',
                    type: 'string'
                }, {
                    label: '年龄',
                    name: 'age',
                    type: 'number'
                }, {
                    label: '身高',
                    name: 'height',
                    type: 'number'
                }],
                expressions: []
            };
        },
        methods: {
            /**
             * 校验用户输入的表达式
             * @param {String} value 
             */
            verifyExpression(value) {
                const verifyResult = utils.isExpression(value, {
                    uid: 'number',
                    name: 'string',
                    age: 'number'
                });
                if (!verifyResult.result) {
                    notificator.alertError(verifyResult.message);
                }
                return verifyResult.result;
            },
            /**
             * 表达式校验通过后生成tag
             * @param {String} value 
             */
            verifyExpressionSuccessful(value) {
                /* eslint no-useless-escape: "off" */
                value = utils.removeWhitespace(value);
                // 包含运算符的情况——表达式
                if (/[\(\)\+\-\*\/]{1,}/g.test(value)) {
                    this.expressions.push(value);
                } else {
                    // 过滤掉输入数字的情况，这里只处理输入字段的情况
                    if (!/^[+-]?\d+(\.\d+)?$/.test(value)) {
                        this.expressions.push(value);
                    }
                }
            }
        },
        components: {
            infinityAdaptiveInput
        }
    };
```

#### 2、使用该组件

* verify：指定用户按键盘 “enter” 键时先执行对用户输入值的校验动作，比如上面的例子中如果表达式输入有误弹窗提示
* enter：指定用户按键盘 “enter” 键时的动作，比如上面例子中将用户输入的表达式生成红色的tag标签并展示

```html
    <infinity-adaptive-input
        placeholder="请输入字段或者表达式并按回车结束，目前支持的数学运算符: +、-、*、/、(、)"
        :verify="verifyExpression"
        :enter="verifyExpressionSuccessful"
        style="max-width:99%;min-width:530px;"
    />
```