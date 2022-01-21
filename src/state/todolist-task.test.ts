import {TodolistsTaskType, TodoTaskType} from '../App';
import {addTodolistAC, todolistReducer} from './todolist/todolist-reducer';
import {tasksReducer} from './tasks/task-reducer';

test('ids should be equals', () => {
    const startTasksState: TodoTaskType = {};
    const startTodolistsState: Array<TodolistsTaskType> = [];
    const action = addTodolistAC('new todolist');
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});