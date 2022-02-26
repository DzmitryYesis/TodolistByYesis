import {ResponseType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setAppStatusAC, setErrorAC} from '../app/app-reducer';

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setErrorAC> | ReturnType<typeof setAppStatusAC>>