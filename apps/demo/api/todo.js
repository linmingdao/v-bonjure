// 获取待办列表
export const TODOLIST = userid => `/todolist/${userid}`;
// 新增TODO
export const ADD_TODO = userid => `/todolist/${userid}/todo`;
// 删除TODO
export const DELETE_TODO = (userid, todoid) => `/todolist/${userid}/todo/${todoid}`;
// 更新TODO
export const UPDATE_TODO = (userid, todoid) => `/todolist/${userid}/todo/${todoid}`;