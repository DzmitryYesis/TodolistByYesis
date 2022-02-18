import {
    addTodolistAC, removeTodolistAC, setTodolistsAC
} from '../todolist-reducer/todolist-reducer';
import {TaskStatuses, TaskType, todolistAPI, TodoTaskType} from '../../../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../../app/store';

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
            return {...state, [action.todolistId]:action.tasks}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)}
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

//action
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    newTitle
} as const)
export const setTaskAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

// thunk
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskActionType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(todolistId, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionType>) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
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
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
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

// types
export type TaskActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTaskAC>