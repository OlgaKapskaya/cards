import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface LoginStateType {
  //login:
}

// export const getLoginDataTC = createAsyncThunk('login/getLoginData', async () => {
//     const response = await ////
//     return response
// })

export const loginSlice = createSlice({
  name: 'login',
  initialState: {} as LoginStateType,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(
    //     getLoginDataTC.fulfilled,
    //     (state, action) => {
    //    // state.login = action.payload
    // })
  },
})
