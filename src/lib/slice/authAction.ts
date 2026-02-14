import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCurrentUser, forgotPasswordApi, loginApi, signupApi, emailVerificationApi, resetPasswordApi } from '../api/apiClient';
import type { LoginRequest, AuthResponse, SignupRequest, ForgotPasswordRequest, EmailVerificationRequest, ResetPasswordRequest } from '@/types/authTypes';
import { clearAuth } from './authSlice';
import type { RootState } from '../store';
import { toast } from 'sonner';

export const initializeAuth = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
    "auth/initialize",
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {
            // 1. Check Redux state first, fallback to localStorage
            const state = getState() as RootState;
            const token = state.auth.token || localStorage.getItem("authToken");

            // 2. If no token exists anywhere, exit silently (or with error)
            if (!token) {
                return rejectWithValue("No token found");
            }

            // 3. Fetch user data using the token (Interceptor will attach it)
            const response = await fetchCurrentUser();

            // 4. Return the data (Ensure your extraReducers handle setting the token back to state)
            return response.data;

        } catch (err: any) {
            // 5. Cleanup on failure (Invalid or expired token)
            localStorage.removeItem("authToken");
            dispatch(clearAuth());

            const message = err.response?.data?.message || err.message || "Session expired";
            return rejectWithValue(message);
        }
    }
);

export const loginAction = createAsyncThunk<AuthResponse, LoginRequest, { rejectValue: string }>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            toast.success("Login Successful")
            return response.data;
        }
        catch (err: any) {
            const message = err.response?.data?.message || err.message || "Login request failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
)

export const forgotPasswordAction = createAsyncThunk<void, ForgotPasswordRequest, { rejectValue: string }>(
    "auth/forgot-password",
    async (payload, { rejectWithValue }) => {
        try {
            await forgotPasswordApi(payload);
            toast.success("OTP has been sent to your email.")
            return;
        }
        catch (err: any) {
            const message = err.response?.data?.message || err.message || "Forgot Password request failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
)

export const emailVerificationAction = createAsyncThunk<void, { data: EmailVerificationRequest, userId: string }, { rejectValue: string }>(
    "auth/verify-email",
    async (payload, { rejectWithValue }) => {
        try {
            await emailVerificationApi(payload.data, payload.userId);
            toast.success("Email Verified")
            return;
        }
        catch (err: any) {
            const message = err.response?.data?.message || err.message || "Forgot Password request failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
)


export const resetPasswordAction = createAsyncThunk<void, { data: ResetPasswordRequest, userId: string }, { rejectValue: string }>(
    "auth/reset-password",
    async (payload, { rejectWithValue }) => {
        try {
            await resetPasswordApi(payload.data, payload.userId);
            toast.success("Password Reset Successful")
            return;
        }
        catch (err: any) {
            const message = err.response?.data?.message || err.message || "Forgot Password request failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
)
export const signupAction = createAsyncThunk<void, SignupRequest, { rejectValue: string }>(
    'user/signup',
    async (payload, { rejectWithValue }) => {
        try {
            await signupApi(payload);
        } catch (err: any) {
            const message =
                err.response?.data?.message || err.message || "Signup request failed";
            return rejectWithValue(message);
        }
    }
)