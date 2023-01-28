import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appAPI } from './appAPI'

import { setLoggedIn } from 'features/auth/authSlice'
import { setUserData } from 'features/profile/profileSlice'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle',
  message: null as string | null,
  isInitialized: false,
}

export const me = createAsyncThunk('app/me', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const response = await appAPI.me()

    dispatch(setLoggedIn(true))
    dispatch(setUserData(response.data))

    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    dispatch(setLoggedIn(false))
    dispatch(setAppStatus('failed'))
  } finally {
    dispatch(setAppInitialized(true))
  }
})

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload
    },
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
  },
})
export const { setAppMessage, setAppStatus, setAppInitialized } = appSlice.actions
export const appReducer = appSlice.reducer
