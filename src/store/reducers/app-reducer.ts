
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state:InitialStateType = initialState, action:AppActionType):InitialStateType =>{
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state

    }
}

// actions
export const setAppStatusAC = (status:RequestStatusType) =>({type:'APP/SET-STATUS', status} as const)
export const setErrorAC = (error:null | string) => ({type:'APP/SET-ERROR', error} as const)

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState
type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorAC>