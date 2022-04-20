export const SET_IS_LOGGED_IN = 'LOGIN/SET-IS-LOGGED-IN';
export const SET_IS_INITIALIZED = 'LOGIN/SET-IS-INITIALIZED';

export const setIsLoggedInAC = (value: boolean) =>
  ({
    type: SET_IS_LOGGED_IN,
    payload: {
      value,
    },
  } as const);

export const setIsInitializedAC = (value: boolean) =>
  ({
    type: SET_IS_INITIALIZED,
    payload: {
      value,
    },
  } as const);
