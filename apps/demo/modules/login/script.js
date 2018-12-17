import notificator from '@core/notificator';
import { goto } from '@core/router';
// 映射全局的仍然用mapState，映射模块的使用createNamespacedHelpers
import { createNamespacedHelpers } from 'vuex';
import { handleLogin, handleRemeberUser, askRemeberMe } from '../../handlers/login';
import { MODULES, MUTATIONS } from '../../constants/storeTypes.js';
import { STATUS_CODE } from '../../constants/index.js';

const map = createNamespacedHelpers(`${MODULES.LOGIN}`);

export default {
    data() {
        return {
            checked: false,
            // 登录界面背景的粒子数量
            particleQuantity: 50,
            // 带校验规则的表单字段
            ruleForm: {
                username: '',
                password: ''
            },
            // 配置用户名密码的校验规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...map.mapState(['pending'])
    },
    methods: {
        ...map.mapMutations([MUTATIONS.SET_2_LODING_STATE, MUTATIONS.SET_2_NORMAL_STATE]),
        /**
         * 提交表单数据
         * @param {*} formName 
         */
        submitForm(formName) {
            // 校验用户名和密码
            this.$refs[formName].validate(async(valid) => {
                // 校验通过
                if (valid) {
                    // 显示 立即登录 按钮的loading状态
                    this[MUTATIONS.SET_2_LODING_STATE]();

                    // 视图层调用handler处理业务
                    const response = await handleLogin({
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    });

                    // 业务层处理网络层请求返回的结果
                    if (response.code === STATUS_CODE.REQUEST_OK) {
                        // 登录成功, 处理记住用户
                        handleRemeberUser({
                            token: response.data.token,
                            remeber: this.checked,
                            username: this.ruleForm.username,
                            password: this.ruleForm.password
                        }).then(() => {
                            // 登录成功跳转到首页
                            goto('/home');
                        });
                    } else {
                        // 登录失败提示异常消息
                        notificator.messageWarning(response.msg);
                    }

                    // 隐藏 立即登录 按钮的loading状态
                    this[MUTATIONS.SET_2_NORMAL_STATE]();
                } else {
                    // 校验不通过
                    notificator.messageWarning('用户名密码校验不通过');
                    return false;
                }
            });
        },
        /**
         * 重置表单数据
         * @param {*} formName 
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted() {
        // 咨询是否记住用户了
        askRemeberMe().then(response => {
            if (response.remeber) {
                // 自动填充表单
                this.ruleForm.username = response.username;
                this.ruleForm.password = response.password;
                this.$set(this, 'checked', true);
            } else {
                this.ruleForm.username = '';
                this.ruleForm.password = '';
                this.$set(this, 'checked', false);
            }
        });
    }
}