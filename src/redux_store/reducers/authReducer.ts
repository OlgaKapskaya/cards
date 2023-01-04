
type AuthAT = any
const initState = {}
type AuthStateType = typeof initState

export const authReducer = (state = initState, action: AuthAT): AuthStateType => {
    return state
}