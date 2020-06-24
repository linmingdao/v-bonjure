/**
 * 替换@import中的别名信息
 * @param {*} id
 * @returns
 */
function convertAlias(id) {
    let aliasName;
    const ALIAS_CONFIG = JSON.parse(process.env.ALIAS);
    const ALIAS_NAME = Object.keys(ALIAS_CONFIG);
    for (let i = 0, size = ALIAS_NAME.length; i < size; i++) {
        if (id.indexOf(ALIAS_NAME[i]) !== -1) {
            aliasName = ALIAS_NAME[i];
            break;
        }
    }
    return aliasName ? id.replace(aliasName, ALIAS_CONFIG[aliasName]) : id;
}

module.exports = {
    plugins: {
        // 样式文件的导入处理
        'postcss-import': {
            resolve: function(id, basedir, importOptions) {
                return convertAlias(id);
            }
        },
        'postcss-url': {},
        // 自动补全厂商前缀——postcss-cssnext已经包含该插件了，无需重复添加
        // 'autoprefixer': {
        //     browsers: '> 5%'
        // },
        // 使用下一个版本的css语法
        'postcss-cssnext': {
            browsers: [
                // 兼容,不指定默认则是该插件默认范围,最近两个版本
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9'
            ],
            flexbox: 'no-2009'
        },
        // 压缩
        // cssnano: {
        //     preset: 'advanced',
        //     autoprefixer: false,
        //     'postcss-zindex': false
        // },
        // 把px转换成rem
        'postcss-pxtorem': {
            rootValue: 16, //在html节点设的font-size大小
            unitPrecision: 5, //转rem精确到小数点多少位
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'], //指定转换成rem的属性，支持 * ！
            selectorBlackList: [], // str/reg 指定不转换的选择器，str时包含字段即匹配
            replace: true,
            mediaQuery: false, //媒体查询内的px是否转换
            minPixelValue: 0 //小于指定数值的px不转换
        }
    }
};
