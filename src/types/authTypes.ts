export interface User {
    id: number,
    fullName: string,
    email: string,
    role: string
}

export type LoginRequest = {
    email: string,
    password: string
};
export type ForgotPasswordRequest = {
    email: string,
};
export type ResetPasswordRequest = {
    verificationCode: string,
    newPassword: string
};
export type EmailVerificationRequest = {
    verificationCode: string,
};

export type SignupRequest = {
    fullName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}