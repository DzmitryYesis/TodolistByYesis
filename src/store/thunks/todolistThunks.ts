import { Dispatch } from 'redux';

import { todolistAPI } from 'api';
import { RequestStatus, ResultCode } from 'enum';
import {
  addTodolistAC,
  AllAppActionType,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setAppStatusAC,
  setTodolistsAC,
} from 'store/actions';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const setTodolistsTC = () => (dispatch: Dispatch<AllAppActionType>) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const removeTodolistTC =
  (todolistId: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatus.LOADING));
    todolistAPI
      .deleteTodolist(todolistId)
      .then(res => {
        if (res.status === ResultCode.Success) {
          dispatch(removeTodolistAC(todolistId));
          dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const addTodolistTC =
  (title: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    todolistAPI
      .createTodolist(title)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolistAC(res.data.data.item));
          dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<AllAppActionType>) => {
    dispatch(setAppStatusAC(RequestStatus.LOADING));
    todolistAPI
      .updateTodolistTitle(todolistId, title)
      .then(res => {
        if (res.status === ResultCode.Success) {
          dispatch(changeTodolistTitleAC(todolistId, title));
          dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
