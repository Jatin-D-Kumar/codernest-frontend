import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  loggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  userData: any;
}

const initialState: UserState = {
  loggedIn: false,
  accessToken: "",
  refreshToken: "",
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loggedIn = true;
    },
    setUserDataAndTokens: (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
    logout: () => initialState,
  },
});

export const isLoggedIn = (state: RootState) => state.user.loggedIn;
export const loggedInUserId = (state: RootState) => state.user.userData?._id;

// Action creators are generated for each case reducer function
export const { setTokens, setUserData, setUserDataAndTokens, logout } =
  userSlice.actions;

export default userSlice.reducer;
