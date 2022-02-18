
const initialState = {
    status: 'loading' as null | string
}

export const appReducer = (state:InitialStateType = initialState, action:AppActionType) =>{
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state

    }
}

// actions
export const setAppStatusAC = (status:RequestStatusType) =>({type:'APP/SET-STATUS', status} as const)

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState
type AppActionType = ReturnType<typeof setAppStatusAC>