import {
  ADD_TASK,
  ADD_TODOLIST,
  AllAppActionType,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_TASK,
  REMOVE_TODOLIST,
  SET_TASKS,
  SET_TODOLISTS,
} from 'store/actions';
import { TodoTaskType } from 'types';

const initialState: TodoTaskType = {};

export const tasksReducer = (
  state: TodoTaskType = initialState,
  action: AllAppActionType,
): TodoTaskType => {
  const stateCopy = { ...state };
  switch (action.type) {
    case SET_TODOLISTS:
      action.payload.todolists.forEach(tl => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    case SET_TASKS:
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    case REMOVE_TASK:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          t => t.id !== action.payload.taskId,
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      };
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId
            ? {
                ...t,
                status: action.payload.status,
              }
            : t,
        ),
      };
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.newTitle,
              }
            : t,
        ),
      };
    case ADD_TODOLIST:
      return { ...state, [action.payload.todolist.id]: [] };
    case REMOVE_TODOLIST:
      delete stateCopy[action.payload.todolistId];
      return stateCopy;
    default:
      return state;
  }
};
