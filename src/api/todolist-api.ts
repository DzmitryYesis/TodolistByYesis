import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0aa73782-910d-40ce-8ee8-c0a12e637003'
    }
})

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseTodoType<D = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: D
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodoType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodoType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseTodoType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title:string){
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    }
}