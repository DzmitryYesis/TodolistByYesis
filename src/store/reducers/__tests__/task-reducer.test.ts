import { TaskPriorities, TaskStatuses, NumberForTest } from 'enum';
import {
  addTodolistAC,
  removeTodolistAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from 'store/actions';
import { tasksReducer } from 'store/reducers';
import { TodoTaskType } from 'types';

let startState: TodoTaskType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'HTML',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '2',
        title: 'REACTJS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'TS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '2',
        title: 'SalesForce',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '3',
        title: 'Redux',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'));
  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'HTML',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '2',
        title: 'REACTJS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'TS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
      {
        id: '3',
        title: 'Redux',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
      },
    ],
  });
});

test('correct task should be added from correct array', () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      id: '4',
      title: 'juce',
      status: TaskStatuses.New,
      todoListId: 'todolistId2',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriorities.Low,
      description: '',
    }),
  );

  expect(endState.todolistId1.length).toBe(NumberForTest.THREE);
  expect(endState.todolistId2.length).toBe(NumberForTest.FOUR);
  expect(endState.todolistId2[NumberForTest.ZERO].id).toBeDefined();
  expect(endState.todolistId2[NumberForTest.ZERO].title).toBe('juce');
  expect(endState.todolistId2[NumberForTest.ZERO].status).toBe(TaskStatuses.New);
});

test('correct task status should be changed', () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC('todolistId2', '2', TaskStatuses.New),
  );

  expect(endState.todolistId1.length).toBe(NumberForTest.THREE);
  expect(endState.todolistId2.length).toBe(NumberForTest.THREE);
  expect(endState.todolistId2[NumberForTest.ONE].status).toBe(TaskStatuses.New);
  expect(endState.todolistId1[NumberForTest.ONE].status).toBe(TaskStatuses.New);
});

test('correct task title should be changed', () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC('todolistId2', '2', 'Yhoho'),
  );

  expect(endState.todolistId1.length).toBe(NumberForTest.THREE);
  expect(endState.todolistId2.length).toBe(NumberForTest.THREE);
  expect(endState.todolistId2[NumberForTest.ONE].title).toBe('Yhoho');
  expect(endState.todolistId1[NumberForTest.ONE].title).toBe('REACTJS');
});

test('new array should be added when new Todolist added', () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({ id: 'todolistId3', title: 'What to buy', addedDate: '', order: 2 }),
  );
  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }
  expect(keys.length).toBe(NumberForTest.THREE);
  expect(endState[newKey]).toEqual([]);
});

test('Array with task should be deleted when Todolist deleted', () => {
  const endState = tasksReducer(startState, removeTodolistAC('todolistId2'));
  const keys = Object.keys(endState);
  expect(keys.length).toBe(NumberForTest.ONE);
  expect(endState.todolistId2).not.toBeDefined();
});
