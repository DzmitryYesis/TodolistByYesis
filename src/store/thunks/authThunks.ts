import { Dispatch } from 'redux';

import { authAPI } from 'api/auth-api';
import { RequestStatus } from 'enum';
import {
  AllAppActionType,
  setAppStatusAC,
  setIsInitializedAC,
  setIsLoggedInAC,
} from 'store/actions';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const loginTC = (data: any) => (dispatch: Dispatch<AllAppActionType>) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
      dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
    });
};
export const logoutTC = () => (dispatch: Dispatch<AllAppActionType>) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
