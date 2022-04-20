import { RequestStatus } from 'enum';

export type RequestStatusType =
  | RequestStatus.IDLE
  | RequestStatus.LOADING
  | RequestStatus.SUCCEEDED
  | RequestStatus.FAILED;
