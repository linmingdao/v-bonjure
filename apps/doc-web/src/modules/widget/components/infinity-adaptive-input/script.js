import utils from '@utils';
import notificator from '@core/notificator';
import infinityAdaptiveInput from '@vBaseComponent/infinity-adaptive-input/infinity-adaptive-input.vue';

export default {
    data() {
        return {
            fields: [
                {
                    label: '用户id',
                    name: 'uid',
                    type: 'number'
                },
                {
                    label: '姓名',
                    name: 'name',
                    type: 'string'
                },
                {
                    label: '年龄',
                    name: 'age',
                    type: 'number'
                },
                {
                    label: '身高',
                    name: 'height',
                    type: 'number'
                }
            ],
            expressions: ['age+10*2']
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
