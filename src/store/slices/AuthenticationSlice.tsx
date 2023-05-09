import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authenticationState {
  userEmail: string | null;
  userPassword: string | null;
}

const initialState: authenticationState = {
  userEmail: null,
  userPassword: null,
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserEmail: (
      state,
      action: PayloadAction<{ userEmail: string | null }>
    ) => {
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setUserEmail } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
