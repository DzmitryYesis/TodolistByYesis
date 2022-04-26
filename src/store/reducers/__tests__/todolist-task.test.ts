import { NumberForTest } from 'enum';
import { addTodolistAC } from 'store/actions';
import { tasksReducer, todolistsReducer } from 'store/reducers';
import { TodoTaskType, TodolistDomainType } from 'types';

test('ids should be equals', () => {
  const startTasksState: TodoTaskType = {};
  const startTodolistsState: TodolistDomainType[] = [];
  const action = addTodolistAC({
    id: 'todolistId2',
    title: 'What to buy',
    addedDate: '',
    order: 2,
  });
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);
  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[NumberForTest.ZERO];
  const idFromTodolists = endTodolistsState[NumberForTest.ZERO].id;
  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
