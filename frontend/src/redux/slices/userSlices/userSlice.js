import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

// export const registerUserAction = createAsyncThunk(
//   'user/register',
//   async (
//     { fullname, email, password },
//     { rejectWithValue, getState, dispatch }
//   ) => {
//     try {
//       // make request
//       const { data } = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ fullname, email, password }),
//       })
//       return data
//     } catch (error) {
//       rejectWithValue(error?.message)
//     }
//   }
// )

// create slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   extraReducers: (builder) => {
//     // register
//     builder.addCase(registerUserAction.pending, (state) => {
//       state.loading = true
//     })
//     builder.addCase(registerUserAction.fulfilled, (state, action) => {
//       state.currentUser = action.payload
//       state.loading = false
//       state.error = null
//     })
//     builder.addCase(registerUserAction.rejected, (state, action) => {
//       state.error = action.payload
//       state.loading = false
//     })
//   },
// })

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
