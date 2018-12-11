/**
 * 模块名称
 */
export const MODULES = {
    // home模块
    'HOME': 'home',
    'TODO_LIST': 'todoList',
    'COUNTER': 'counter',
    // 登录模块
    'LOGIN': 'login'
};

/**
 * mutation类型
 */
export const MUTATIONS = {
    // home模块
    'INIT_TODOLIST': 'initTodolist',
    'ADD_TODO': 'addTodo',
    'DELETE_TODO': 'deleteTodo',
    'FINISH_TODO': 'finishTodo',
    'INCREMENT': 'increment',
    'DECREMENT': 'decrement',
    // 登录模块
    'SET_2_LODING_STATE': 'set2LodingState',
    'SET_2_NORMAL_STATE': 'set2NormalState',
};

/**
 * action类型
 */
export const ACTIONS = {
    // home模块
    'GET_TODOLIST': 'getTodolist',
    // 登录模块
    'LOGIN': 'login'
};