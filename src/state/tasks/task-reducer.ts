import {TodoTaskType} from '../../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from '../todolist/todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolist-api';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    newTaskTitle: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status:TaskStatuses
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTitle: string
}

export type TaskActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState:TodoTaskType = {}

export const tasksReducer = (state: TodoTaskType = initialState, action: TaskActionType):TodoTaskType  => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask: TaskType = {
                id: v1(),
                title: action.newTaskTitle,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let copyTask = {...state}
            delete copyTask[action.todolistId]
            return copyTask
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (todolistId: string, newTaskTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, newTaskTitle}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status:TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle}
}
