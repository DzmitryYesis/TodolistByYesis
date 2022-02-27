import axios from 'axios';
import {ResponseType} from './todolist-api';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fdebf1e1-855a-49ea-8c4a-6136d43ccea5'
    }
})

//api

export const authAPI = {
    login(value: LoginParamsType) {
        return instance.post<ResponseType<{userId:number}>>('auth/login', value)
    }
}

//types

type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}