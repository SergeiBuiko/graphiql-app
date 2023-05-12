import { configureStore } from '@reduxjs/toolkit';
import { AuthenticationSlice } from './slices/AuthenticationSlice';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
