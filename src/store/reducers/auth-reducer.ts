import { AllAppActionType, SET_IS_INITIALIZED, SET_IS_LOGGED_IN } from 'store/actions';

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AllAppActionType,
): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload.value };
    case SET_IS_INITIALIZED:
      return { ...state, isInitialized: action.payload.value };
    default:
      return state;
  }
};
