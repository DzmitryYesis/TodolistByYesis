import { setIsInitializedAC, setIsLoggedInAC } from 'store/actions';

export type AuthActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsInitializedAC>;
