import { configureStore } from '@reduxjs/toolkit'

import { appSlice } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
