import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0aa73782-910d-40ce-8ee8-c0a12e637003'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}