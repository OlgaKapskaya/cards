import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/auth/authSlice'
import { packsReducer } from '../features/packs/packsSlice'
import { cardsReducer } from '../features/cards/cardsSlice'
import { profileReducer } from '../features/profile/profileSlice'

import { appReducer } from './appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    auth: authReducer,
    packs: packsReducer,
    cardsList: cardsReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

//@ts-ignore
window.state = store
