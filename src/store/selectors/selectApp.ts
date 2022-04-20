import { RequestStatusType } from 'store/reducers/app-reducer';
import { AppRootStateType } from 'store/store';

export const selectStatus = (state: AppRootStateType): RequestStatusType =>
  state.app.status;
