import { getTodolist } from '../../net/home';

/**
 * 获取todolist列表
 */
export async function requestTodolist() {
    const response = await getTodolist();
    return response;
};