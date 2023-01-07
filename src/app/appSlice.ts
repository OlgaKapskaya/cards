import { createAction, createSlice } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AppStateType {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const setAppError = createAction<string>('app/setAppError')
export const setAppStatus = createAction<RequestStatusType>('app/setAppStatus')
export const setAppInitialized = createAction<boolean>('app/setAppInitialized')

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialized: false,
  } as AppStateType,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setAppError, (state, action) => {
        state.error = action.payload
      })
      .addCase(setAppStatus, (state, action) => {
        state.status = action.payload
      })
      .addCase(setAppInitialized, (state, action) => {
        state.isInitialized = action.payload
      })
  },
})
