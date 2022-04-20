import { RequestStatusType } from 'types';

export const SET_STATUS = 'APP/SET-STATUS';
export const SET_ERROR = 'APP/SET-ERROR';

export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: SET_STATUS,
    payload: {
      status,
    },
  } as const);
export const setErrorAC = (error: null | string) =>
  ({
    type: SET_ERROR,
    payload: {
      error,
    },
  } as const);
