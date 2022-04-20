import { AppRootStateType } from 'store';
import { RequestStatusType } from 'types';

export const selectStatus = (state: AppRootStateType): RequestStatusType =>
  state.app.status;
