import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks/task-reducer';
import {todolistReducer} from '../../state/todolist/todolist-reducer';
import {v1} from 'uuid';
import {AppRootStateType} from '../../state/store';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer
})

const initialGlobalState = {
  todolists: [
    {id: 'todolistId1', todolistTitle: 'What to learn', filter: 'all'},
    {id: 'todolistId2', todolistTitle: 'What to buy', filter: 'all'}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storeFn:any) => {
  return <Provider store={storyBookStore}>{storeFn()}</Provider>
}