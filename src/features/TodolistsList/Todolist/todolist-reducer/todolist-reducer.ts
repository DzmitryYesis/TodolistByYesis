import {todolistAPI, TodolistType} from '../../../../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)
        default:
            return state
    }
}

// action
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter: newFilter
} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTitle
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunk
export const setTodolistsTC = () => (dispatch: Dispatch<TodolistActionType>) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

// types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}