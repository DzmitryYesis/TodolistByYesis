import { AppRootStateType } from 'store';

export const selectIsInitialized = (state: AppRootStateType): boolean =>
  state.auth.isInitialized;

export const selectIsLoggedIn = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;
