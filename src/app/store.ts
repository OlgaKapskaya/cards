import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/auth/authSlice'
import { packsListReducer } from '../features/packs/packsListSlice'
import { profileReducer } from '../features/profile/profileSlice'

import { appReducer } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    auth: authReducer,
    packsList: packsListReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

//@ts-ignore
window.state = store
