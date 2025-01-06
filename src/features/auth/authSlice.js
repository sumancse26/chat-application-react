import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: undefined,
    user: undefined,
  },
  reducers: {
    userRegister: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogout: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userRegister, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
