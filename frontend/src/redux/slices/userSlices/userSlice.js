import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // profile
    UpdateUserStart: (state) => {
      state.loading = true;
    },
    UpdateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    UpdateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // delete user
    DeleteUserStart: (state) => {
      state.loading = true;
    },
    DeleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    DeleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // logout
    SignOutStart: (state) => {
      state.loading = true;
    },
    SignOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    SignOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

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

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  SignOutStart,
  SignOutSuccess,
  SignOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
