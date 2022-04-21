import { Dispatch } from 'redux';

import { setAppStatusAC, setErrorAC } from 'store/actions';

export type ErrorUtilsDispatchType = Dispatch<
  ReturnType<typeof setErrorAC> | ReturnType<typeof setAppStatusAC>
>;
