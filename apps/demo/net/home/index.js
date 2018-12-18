import * as TODO_API from '../../api/todo';
import httpClient from '../httpClient';
import * as localStorageHelper from '../../utils/localStorageHelper';

/**
 * 获取todolist列表
 */
export async function getTodolist() {
    // Step_1: 发起请求
    // NOTE: 网络层，只负责发送请求与接收请求，对请求返回的数据做二次计算应当是业务层的职责
    const response = await httpClient.get(TODO_API.TODOLIST(localStorageHelper.get('userid')));

    // Step_2: 返回响应数据
    return response;
};

/**
 * 新增todo
 * @param {Object} todo 
 */
export async function addTodo(todo) {
    const response = await httpClient.disableLoading().post(TODO_API.ADD_TODO(localStorageHelper.get('userid')), { todo });
    return response;
};

/**
 * 删除todo
 * @param {Object} todo 
 */
export async function deleteTodo(todo) {
    const response = await httpClient.disableLoading().delete(TODO_API.DELETE_TODO(localStorageHelper.get('userid'), todo.id), { todo });
    return response;
};

/**
 * 更新todo
 * @param {Object} todo 
 */
export async function updateTodo(todo) {
    const response = await httpClient.disableLoading().patch(TODO_API.UPDATE_TODO(localStorageHelper.get('userid'), todo.id), { todo });
    return response;
};