import { RequestStatus } from 'enum';
import { AllAppActionType } from 'store/actions';

type InitialStateType = typeof initialState;

const initialState = {
  status: RequestStatus.LOADING,
  error: null as null | string,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AllAppActionType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
