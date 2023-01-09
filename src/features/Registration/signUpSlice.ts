import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface registrationState {
  isRegistered: boolean
}

const initialState: registrationState = {
  isRegistered: false,
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUpStatusCreator(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload
    },
  },
})

export const { signUpStatusCreator } = signUpSlice.actions
