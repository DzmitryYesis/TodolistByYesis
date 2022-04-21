import {
  AppActionType,
  AuthActionType,
  TasksActionType,
  TodolistActionType,
} from 'store/actions';

export type AllAppActionType =
  | AppActionType
  | AuthActionType
  | TasksActionType
  | TodolistActionType;
