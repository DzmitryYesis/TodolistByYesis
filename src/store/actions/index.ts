export { SET_STATUS, SET_ERROR, setAppStatusAC, setErrorAC } from './appActions';

export {
  SET_IS_INITIALIZED,
  SET_IS_LOGGED_IN,
  setIsInitializedAC,
  setIsLoggedInAC,
} from './authActions';

export {
  ADD_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_TASK_STATUS,
  REMOVE_TASK,
  SET_TASKS,
  changeTaskTitleAC,
  changeTaskStatusAC,
  removeTaskAC,
  setTasksAC,
  addTaskAC,
} from './tasksActions';

export {
  SET_TODOLISTS,
  CHANGE_TODOLIST_ENTITY_STATUS,
  CHANGE_TODOLIST_TITLE,
  CHANGE_TODOLIST_FILTER,
  REMOVE_TODOLIST,
  ADD_TODOLIST,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  changeTodolistFilterAC,
  setTodolistsAC,
  addTodolistAC,
} from './todolistsActions';

export type {
  AllAppActionType,
  AppActionType,
  AuthActionType,
  TasksActionType,
  TodolistActionType,
} from './types';
