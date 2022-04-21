import { instance } from 'api';
import { ResponseType, LoginParamsType } from 'types';

export const authAPI = {
  login(value: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', value);
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>(
      'auth/me',
    );
  },
  logout() {
    return instance.delete<ResponseType>('auth/login');
  },
};
