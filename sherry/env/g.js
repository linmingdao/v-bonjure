/**
 * 获取当前的全局对象
 *
 * @author linmingdao
 */
const getGlobal = new Function('return this');

export default getGlobal();