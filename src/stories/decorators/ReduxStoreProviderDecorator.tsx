import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../features/TodolistsList/Todolist/tasks-reducer/task-reducer';
import {todolistReducer} from '../../features/TodolistsList/Todolist/todolist-reducer/todolist-reducer';
import {v1} from 'uuid';
import {AppRootStateType} from '../../app/store';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {appReducer} from '../../app/app-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer
})

const initialGlobalState:AppRootStateType = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 1},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 3}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: 'HTML',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {id: v1(), title: 'REACTJS', status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''},
      {id: v1(), title: 'CSS', status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''}
    ],
    ["todolistId2"]: [
      {id: v1(), title: 'TS', status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''},
      {id: v1(), title: 'SalesForce', status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''}
    ]
  },
  app:{
    status: 'loading'
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storeFn:any) => {
  return <Provider store={storyBookStore}>{storeFn()}</Provider>
}