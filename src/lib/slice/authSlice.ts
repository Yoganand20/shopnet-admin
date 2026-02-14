import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordAction, initializeAuth, loginAction, signupAction } from "./authAction";
import type { AuthState } from "@/types/authTypes";

const token = localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null;


const initialState: AuthState = {
  user: null,
  loading: false,
  token,
  error: null,
  success: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    clearAuth: (state) => {
      localStorage.removeItem("authToken");
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = false;
    },

  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.error = null;
        localStorage.setItem("authToken", token);
        state.success = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message || "Login failed";
        state.user = null;
        state.token = null;
      });

    // register user
    builder
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.token = null;
        state.user = null;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message || "Signup failed";
        state.user = null;
        state.token = null;
      });

    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.loading = false;
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.error = null;
      localStorage.setItem("authToken", token);
      state.success = true;
    });

    // forgot passworf
    builder
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message || "Forgot Password failed";
      });
  }

})


export const { clearAuth, setToken } = authSlice.actions;
export default authSlice.reducer;