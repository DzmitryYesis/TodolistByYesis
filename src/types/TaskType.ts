import { TaskPriorities, TaskStatuses } from 'enum';

export type TaskType = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: string;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadLine: string;
};

export type GetTaskType = {
  totalCount: number;
  error: string | null;
  items: TaskType[];
};

export type TodoTaskType = {
  [key: string]: TaskType[];
};
