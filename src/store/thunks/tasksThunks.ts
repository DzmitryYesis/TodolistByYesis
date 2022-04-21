import { Dispatch } from 'redux';

import { todolistAPI } from 'api';
import { RequestStatus, ResultCode, TaskStatuses } from 'enum';
import { AppRootStateType } from 'store';
import {
  addTaskAC,
  AllAppActionType,
  changeTaskStatusAC,
  changeTaskTitleAC,
  changeTodolistEntityStatusAC,
  removeTaskAC,
  setAppStatusAC,
  setTasksAC,
} from 'store/actions';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const setTasksTC =
  (todolistId: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    todolistAPI
      .getTasks(todolistId)
      .then(res => {
        dispatch(setTasksAC(todolistId, res.data.items));
        dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatus.LOADING));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        if (res.status === ResultCode.Success) {
          dispatch(removeTaskAC(todolistId, taskId));
          dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      })
      .finally(() => {
        dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatus.IDLE));
      });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    todolistAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskStatusTC =
  (todolistId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch<AllAppActionType>, getState: () => AppRootStateType) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatus.LOADING));
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    const allTasks = getState().tasks;
    const tasksFromCurrentTodolist = allTasks[todolistId];
    const task = tasksFromCurrentTodolist.find(t => t.id === taskId);
    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title: task.title,
          status,
          priority: task.priority,
          description: task.description,
          startDate: task.startDate,
          deadLine: task.deadline,
        })
        .then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTaskStatusAC(todolistId, taskId, status));
            dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch(error => {
          handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
          dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatus.IDLE));
        });
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch<AllAppActionType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    const allTasks = getState().tasks;
    const tasksFromCurrentTodolist = allTasks[todolistId];
    const task = tasksFromCurrentTodolist.find(t => t.id === taskId);
    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title,
          status: task.status,
          priority: task.priority,
          description: task.description,
          startDate: task.startDate,
          deadLine: task.deadline,
        })
        .then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTaskTitleAC(todolistId, taskId, title));
            dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch(error => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
