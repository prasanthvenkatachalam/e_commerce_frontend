
// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: {
        id: string | null;
        email: string | null;
        userType: string | null;
        roleType: string | null
    } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuth(state, action: PayloadAction<{ token: string; user: {id:string, email:string, userType: string, roleType: string} }>) {
        state.token = action.payload.token;
        state.user = action.payload.user
      },
     clearAuth(state) {
         state.token = null;
         state.user = null
     }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;