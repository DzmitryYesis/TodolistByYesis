import { FilterType } from 'store/reducers/todolists-reducer';
import { RequestStatusType } from 'types';

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};
