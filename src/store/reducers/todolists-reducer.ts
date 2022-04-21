import { Filter, RequestStatus } from 'enum';
import {
  ADD_TODOLIST,
  AllAppActionType,
  CHANGE_TODOLIST_ENTITY_STATUS,
  CHANGE_TODOLIST_FILTER,
  CHANGE_TODOLIST_TITLE,
  REMOVE_TODOLIST,
  SET_TODOLISTS,
} from 'store/actions';
import { TodolistDomainType } from 'types';

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: AllAppActionType,
): TodolistDomainType[] => {
  switch (action.type) {
    case SET_TODOLISTS:
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: Filter.ALL,
        entityStatus: RequestStatus.IDLE,
      }));
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.payload.todolistId);
    case ADD_TODOLIST:
      return [
        {
          ...action.payload.todolist,
          filter: Filter.ALL,
          entityStatus: RequestStatus.IDLE,
        },
        ...state,
      ];
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl =>
        tl.id === action.payload.todolistId
          ? { ...tl, filter: action.payload.filter }
          : tl,
      );
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl =>
        tl.id === action.payload.todolistId
          ? { ...tl, title: action.payload.newTitle }
          : tl,
      );
    case CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map(tl =>
        tl.id === action.payload.todolistId
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl,
      );
    default:
      return state;
  }
};
