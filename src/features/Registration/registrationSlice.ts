import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface registrationState {
  isRegistered: boolean
}

const initialState: registrationState = {
  isRegistered: false,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRegistered: (state: registrationState, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload
    },
  },
})

export const { setRegistered } = registrationSlice.actions
