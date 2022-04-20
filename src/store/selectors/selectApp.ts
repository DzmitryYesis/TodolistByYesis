import { AppRootStateType } from 'store';
import { RequestStatusType } from 'store/reducers/app-reducer';

export const selectStatus = (state: AppRootStateType): RequestStatusType =>
  state.app.status;
