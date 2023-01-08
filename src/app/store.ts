import { configureStore } from '@reduxjs/toolkit'

import { profileReducer, profileSlice } from '../features/Profile/profileSlice'

import { appSlice } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    profile: profileReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.state = store
