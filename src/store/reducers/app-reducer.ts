import { RequestStatus } from 'enum';

type InitialStateType = typeof initialState;

const initialState = {
  status: RequestStatus.LOADING,
  error: null as null | string,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// types


type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorAC>;
