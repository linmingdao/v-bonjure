import * as netHome from '../../net/home';

/**
 * 获取todolist列表
 */
export async function getTodolist() {
    const response = await netHome.getTodolist();
    return response;
};

/**
 * 新增todo
 * @param {Object} todo 
 */
export async function addTodo(todo) {
    const response = await netHome.addTodo(todo);
    return response;
};

/**
 * 删除todo
 * @param {Object} todo 
 */
export async function deleteTodo(todo) {
    const response = await netHome.deleteTodo(todo);
    return response;
};

/**
 * 更新todo
 * @param {Object} todo 
 */
export async function updateTodo(todo) {
    const response = await netHome.updateTodo(todo);
    return response;
};