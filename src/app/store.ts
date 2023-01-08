import { configureStore } from '@reduxjs/toolkit'

import { signUpSlice } from '../features/Registration/signUpSlice'

import { appSlice } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    signUp: signUpSlice.reducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
