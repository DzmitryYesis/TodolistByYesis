import { setAppStatusAC, setErrorAC } from 'store/actions';

export type AppActionType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setErrorAC>;
