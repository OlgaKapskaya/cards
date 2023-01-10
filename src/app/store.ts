import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { authSlice } from '../features/Login/authSlice'
import { profileReducer } from '../features/Profile/profileSlice'
import { registrationSlice } from '../features/Registration/registrationSlice'

import { appReducer } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    auth: authSlice.reducer,
    signUp: registrationSlice.reducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

//@ts-ignore
window.state = store
