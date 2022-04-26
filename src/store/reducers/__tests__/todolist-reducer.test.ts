import { v1 } from 'uuid';

import { Filter, NumberForTest, RequestStatus } from 'enum';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from 'store/actions';
import { todolistsReducer } from 'store/reducers';
import { FilterType, TodolistDomainType } from 'types';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: Filter.ALL,
      addedDate: '',
      order: 1,
      entityStatus: RequestStatus.IDLE,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: Filter.ALL,
      addedDate: '',
      order: 2,
      entityStatus: RequestStatus.IDLE,
    },
  ];
});

test('correct todolist-reducer should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(NumberForTest.ONE);
  expect(endState[NumberForTest.ZERO].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const endState = todolistsReducer(
    startState,
    addTodolistAC({ id: todolistId2, title: 'What to buy', addedDate: '', order: 2 }),
  );

  expect(endState.length).toBe(NumberForTest.THREE);
  expect(endState[NumberForTest.TWO].title).toBe('What to buy');
});

test('correct todolist-reducer should be changed filter', () => {
  const newFilter: FilterType = Filter.COMPLETED;

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(todolistId2, newFilter),
  );

  expect(endState.length).toBe(NumberForTest.TWO);
  expect(endState[NumberForTest.ONE].filter).toBe(Filter.COMPLETED);
  expect(endState[NumberForTest.ZERO].filter).toBe(Filter.ALL);
});

test('correct todolist-reducer should be changed title', () => {
  const newTitle = 'New Todolist Title';

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId2, newTitle),
  );

  expect(endState.length).toBe(NumberForTest.TWO);
  expect(endState[NumberForTest.ONE].title).toBe('New Todolist Title');
  expect(endState[NumberForTest.ZERO].title).toBe('What to learn');
});
