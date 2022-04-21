import { instance } from 'api';
import { PATH_API } from 'enum';
import { ResponseType, LoginParamsType } from 'types';

export const authAPI = {
  login(value: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>(PATH_API.AUTH_LOGIN, value);
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>(
      PATH_API.AUTH_ME,
    );
  },
  logout() {
    return instance.delete<ResponseType>(PATH_API.AUTH_LOGIN);
  },
};
