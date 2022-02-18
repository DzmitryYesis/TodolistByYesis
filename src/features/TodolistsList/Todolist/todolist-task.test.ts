
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist-reducer/todolist-reducer';
import {tasksReducer} from './tasks-reducer/task-reducer';
import {TodoTaskType} from '../../../api/todolist-api';

// test.skip('ids should be equals', () => {
//     const startTasksState: TodoTaskType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//     const action = addTodolistAC();
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistReducer(startTodolistsState, action)
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//     expect(idFromTasks).toBe(action.todolist-reducer.id);
//     expect(idFromTodolists).toBe(action.todolist-reducer.id);
// });