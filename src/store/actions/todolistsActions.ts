import { RequestStatusType, TodolistType, FilterType } from 'types';

export const ADD_TODOLIST = 'TODOLIST/ADD-TODOLIST';
export const REMOVE_TODOLIST = 'TODOLIST/REMOVE-TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'TODOLIST/CHANGE-TODOLIST-TITLE';
export const CHANGE_TODOLIST_FILTER = 'TODOLIST/CHANGE-TODOLIST-FILTER';
export const CHANGE_TODOLIST_ENTITY_STATUS = 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS';
export const SET_TODOLISTS = 'TODOLIST/SET-TODOLISTS';

export const removeTodolistAC = (todolistId: string) =>
  ({
    type: REMOVE_TODOLIST,
    payload: {
      todolistId,
    },
  } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({
    type: ADD_TODOLIST,
    payload: {
      todolist,
    },
  } as const);

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) =>
  ({
    type: CHANGE_TODOLIST_FILTER,
    payload: {
      todolistId,
      filter: newFilter,
    },
  } as const);

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) =>
  ({
    type: CHANGE_TODOLIST_TITLE,
    payload: {
      todolistId,
      newTitle,
    },
  } as const);

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({
    type: SET_TODOLISTS,
    payload: {
      todolists,
    },
  } as const);

export const changeTodolistEntityStatusAC = (
  todolistId: string,
  entityStatus: RequestStatusType,
) =>
  ({
    type: CHANGE_TODOLIST_ENTITY_STATUS,
    payload: {
      todolistId,
      entityStatus,
    },
  } as const);
