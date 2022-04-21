import { Dispatch } from 'redux';

import { TaskStatuses, todolistAPI } from 'api/todolist-api';
import { RequestStatus, ResultCode } from 'enum';
import { AppRootStateType } from 'store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setAppStatusAC,
  setTaskAC,
} from 'store/actions';
import { TaskActionType } from 'store/reducers/task-reducer';
import { changeTodolistEntityStatusAC } from 'store/reducers/todolists-reducer';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const setTasksTC =
  (todolistId: string) => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    todolistAPI
      .getTasks(todolistId)
      .then(res => {
        dispatch(setTaskAC(todolistId, res.data.items));
        dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
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
        dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
      });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionType>) => {
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
  (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
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
          dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
        });
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
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
