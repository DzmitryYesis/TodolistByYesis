import {Dispatch} from 'redux'
import {setAppStatusAC, setErrorAC} from './app-reducer';
import {authAPI} from './../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from './../../utils/error-utils';

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZES':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZES', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsInitializedAC>
