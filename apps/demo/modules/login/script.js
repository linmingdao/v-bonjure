import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS, ACTIONS } from '../../store/types.js';
import Logger from 'logger';
const logger = new Logger('App/Login');
const map = createNamespacedHelpers(`${MODULES.LOGIN}`);

export default {
    data() {
        return {
            particleQuantity: 50,
            ruleForm: {
                username: '',
                password: '',
                remeber: []
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...map.mapState(['loading'])
    },
    methods: {
        ...map.mapActions([ACTIONS.LOGIN]),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    logger.debug('用户名:', this.ruleForm.username, '密码:', this.ruleForm.password);
                    // 执行登录请求的Action动作
                    this[ACTIONS.LOGIN]({
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    });
                } else {
                    logger.debug('用户名密码校验不通过');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}