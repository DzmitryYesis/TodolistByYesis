import { TaskStatuses } from 'enum';
import { TaskType } from 'types';

export const REMOVE_TASK = 'TASK/REMOVE-TASK';
export const ADD_TASK = 'TASK/ADD-TASK';
export const CHANGE_TASK_STATUS = 'TASK/CHANGE-TASK-STATUS';
export const CHANGE_TASK_TITLE = 'TASK/CHANGE-TASK-TITLE';
export const SET_TASKS = 'TASK/SET-TASKS';

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: REMOVE_TASK,
    payload: {
      todolistId,
      taskId,
    },
  } as const);

export const addTaskAC = (task: TaskType) =>
  ({
    type: ADD_TASK,
    payload: {
      task,
    },
  } as const);

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses,
) =>
  ({
    type: CHANGE_TASK_STATUS,
    payload: {
      todolistId,
      taskId,
      status,
    },
  } as const);

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) =>
  ({
    type: CHANGE_TASK_TITLE,
    payload: {
      todolistId,
      taskId,
      newTitle,
    },
  } as const);

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({
    type: SET_TASKS,
    payload: {
      todolistId,
      tasks,
    },
  } as const);
