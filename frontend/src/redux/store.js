import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
