import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from '../features/Login/authSlice'
import { profileReducer } from '../features/Profile/profileSlice'

import { appSlice } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    profile: profileReducer,
    auth: authSlice.reducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.state = store
