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

export type {
  AllAppActionType,
  AppActionType,
  AuthActionType,
  TasksActionType,
  TodolistActionType,
} from './types';
