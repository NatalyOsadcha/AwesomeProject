import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/ config";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, login }, thunkAPI) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      console.log("user register====> ", user);

      // Update the user's profile with the login value
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      return {
        email: user.email,
        uid: user.uid,
        displayName: login,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      console.log("user register====> ", user);
      return {
        displayName: login,
        email: user.email,
        uid: user.uid,
      };
    } catch (error) {
      console.log("Login error:", error.message);
      return null;
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await auth.signOut(auth);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
