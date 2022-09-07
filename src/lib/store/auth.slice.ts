import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export class SimpleUser {
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  gender: string | null;
  username: string | null;
  phoneNo: string | null;
  email: string | null;
  fullName: string | null;
  picture: string | null;
}

export interface AccessToken {
  user: SimpleUser;
  email: string | null;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  token?: AuthToken;
  decoded?: AccessToken;
}

const initialState: AuthState = {
  token: undefined,
  decoded: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthToken>) => {
      state.token = action.payload;
      state.decoded = decodeToken(action.payload.accessToken);
    },
    removeToken: (state) => {
      state.token = undefined;
      state.decoded = undefined;
    }
  }
});

function decodeToken(accessToken?: string): AccessToken | undefined {
  if (accessToken) {
    return jwtDecode(accessToken);
  } else {
    return undefined;
  }
}

// Action creators are generated for each case reducer function
export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
