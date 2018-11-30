// 映射全局的仍然用mapState，映射模块的使用createNamespacedHelpers
import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS } from '../../store/types.js';
import Logger from 'logger';
import { doLogin } from '../../net/login';

const logger = Logger.getLogger('App/View/Login');
const map = createNamespacedHelpers(`${MODULES.LOGIN}`);

export default {
    data() {
        return {
            // 登录界面背景的粒子数量
            particleQuantity: 50,
            // 表单字段
            ruleForm: {
                username: '',
                password: '',
                remeber: []
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
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    // showLoading
                    this[MUTATIONS.SET_2_LODING_STATE]();

                    // 获取用户输入的用户名、密码
                    const payload = { username: this.ruleForm.username, password: this.ruleForm.password };
                    logger.debug('用户名密码', payload);

                    // 视图层直接发起网络请求(没有数据需要缓存于Store，那么就不需要走Action)
                    const response = await doLogin(payload);
                    logger.debug(response);

                    // 响应服务端返回的结果
                    if (response.code === 1001) {
                        // 登录成功跳转到首页
                        this.$router.push('/home');
                    } else {
                        // 登录失败提示异常消息
                        alert(response.msg);
                    }

                    // hideLoading
                    this[MUTATIONS.SET_2_NORMAL_STATE]();
                } else {
                    logger.debug('用户名密码校验不通过');
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
    }
}