import { instance } from 'api';
import { PATH_API } from 'enum';
import { TodolistType, ResponseType } from 'types';

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(PATH_API.TODOLIST);
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(PATH_API.TODOLIST, {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
