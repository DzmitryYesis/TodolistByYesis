import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from '../todolist/todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {TodoTaskType} from '../../AppWithRedux';
import {AppRootStateType} from '../store';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTitle: string
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

export type TaskActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TodoTaskType = {}

export const tasksReducer = (state: TodoTaskType = initialState, action: TaskActionType): TodoTaskType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET-TASKS':
            const statecopy = {...state}
            statecopy[action.todolistId] = action.tasks
            return statecopy
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
            return {...state, [action.todolist.id]: []}
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle}
}
export const setTaskAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(todolistId, res.data.items))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks
        const tasksFromCurrentTodolist = allTasks[todolistId]
        const task = tasksFromCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                status: status,
                priority: task.priority,
                description: task.description,
                startDate: task.startDate,
                deadLine: task.deadline
            })
                .then((res) => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status))
                })
        }
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks
        const tasksFromCurrentTodolist = allTasks[todolistId]
        const task = tasksFromCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: title,
                status: task.status,
                priority: task.priority,
                description: task.description,
                startDate: task.startDate,
                deadLine: task.deadline
            })
                .then((res) => {
                        dispatch(changeTaskTitleAC(todolistId, taskId, title))
                    }
                )
        }
    }
}
