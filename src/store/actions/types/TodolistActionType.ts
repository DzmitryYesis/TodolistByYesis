import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from 'store/actions/todolistsActions';

export type TodolistActionType =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>;
