import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
