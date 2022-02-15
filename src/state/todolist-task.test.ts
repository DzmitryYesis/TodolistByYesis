
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist/todolist-reducer';
import {tasksReducer} from './tasks/task-reducer';
import {TodoTaskType} from '../App';

// test.skip('ids should be equals', () => {
//     const startTasksState: TodoTaskType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//     const action = addTodolistAC();
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistReducer(startTodolistsState, action)
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//     expect(idFromTasks).toBe(action.todolist.id);
//     expect(idFromTodolists).toBe(action.todolist.id);
// });