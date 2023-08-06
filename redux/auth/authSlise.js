import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./authOperationFirebase";

const initialState = {
  user: { login: null, email: null, password: null },
  uid: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.login = payload.displayName;
        state.uid = payload.uid;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.uid = payload.uid;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { login: null, name: null, email: null };
        state.uid = null;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;
