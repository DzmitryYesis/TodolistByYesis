import { RequestStatus } from 'enum';
import { AllAppActionType, SET_ERROR, SET_STATUS } from 'store/actions';

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
    case SET_STATUS:
      return { ...state, status: action.payload.status };
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
