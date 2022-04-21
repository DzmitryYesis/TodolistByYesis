import { RequestStatus } from 'enum';
import { setAppStatusAC, setErrorAC } from 'store/actions';
import { ErrorUtilsDispatchType, ResponseType } from 'types';

const ZERO = 0;
// generic function
export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[ZERO]));
  } else {
    dispatch(setErrorAC('Some error occurred'));
  }
  dispatch(setAppStatusAC(RequestStatus.FAILED));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType,
): void => {
  dispatch(setErrorAC(error.message));
  dispatch(setAppStatusAC(RequestStatus.FAILED));
};
