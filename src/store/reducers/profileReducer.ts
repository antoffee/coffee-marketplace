import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    AuthService,
    // Body_login_user_api_auth_login_post,
    ResendCodeSchema,
    SignupSchema,
    VerifyCodeRequestSchema,
} from 'client';

// First, create the thunk
export const fetchSignup = createAsyncThunk('users/fetchSugnup', async (request: SignupSchema) => {
    const response = await AuthService.signupUserApiAuthSignupPost(request);
    return response;
});
export const fetchVerifyCode = createAsyncThunk('users/fetchVerifyCode', async (request: VerifyCodeRequestSchema) => {
    const resp = await AuthService.verifyCodeApiAuthVerifyCodePost(request);
    return resp;
});

export const fetchResendCode = createAsyncThunk('users/fetchResendCode', async (request: ResendCodeSchema) => {
    const response = await AuthService.resendCodeApiAuthResendCodePost(request);
    return response;
});

export const fetchLoginUser = createAsyncThunk(
    'users/fetchLoginUser',
    async (request: { username: string; password: string }) => {
        const response = await AuthService.loginUserApiAuthLoginPost(request);
        return response;
    },
);

interface ProfileState {
    signUpLoading?: boolean;
    signUpError?: string;

    verifyCodeLoading?: boolean;
    codeVerified?: boolean;
    verifyCodeError?: string;

    authentificationLoading?: boolean;
    authentificateError?: string;
    userEmail?: string;

    // userInfo?: unknown;
    userInfoLoading?: boolean;
    userInfoError?: string;
}

const initialState = {} as ProfileState;

// Then, handle actions in your reducers:
const profileSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        authentificate: () => {
            // state.authentificated = true;
        },
        logout: () => initialState,
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchSignup.pending, (state) => {
            state.signUpLoading = true;
        });
        builder.addCase(fetchSignup.fulfilled, (state) => {
            state.signUpLoading = false;
        });
        builder.addCase(fetchSignup.rejected, (state, action) => {
            state.signUpLoading = false;
            // console.warn(action.error, action.meta);
            state.signUpError = action.error.message;
        });
        builder.addCase(fetchVerifyCode.pending, (state) => {
            state.verifyCodeLoading = true;
        });
        builder.addCase(fetchVerifyCode.fulfilled, (state) => {
            state.verifyCodeLoading = false;
            state.codeVerified = true;
        });
        builder.addCase(fetchVerifyCode.rejected, (state, action) => {
            state.verifyCodeLoading = false;
            state.verifyCodeError = action.error.message;
        });
        builder.addCase(fetchResendCode.pending, (state) => {
            state.verifyCodeLoading = true;
        });
        builder.addCase(fetchResendCode.fulfilled, (state) => {
            state.verifyCodeLoading = false;
        });
        builder.addCase(fetchResendCode.rejected, (state) => {
            state.verifyCodeLoading = false;
            state.verifyCodeError = 'Произошла ошибка при отправке кода';
        });

        builder.addCase(fetchLoginUser.pending, (state) => {
            state.authentificationLoading = true;
        });
        builder.addCase(fetchLoginUser.fulfilled, (state) => {
            state.authentificationLoading = true;
        });
    },
});

export const { authentificate, logout } = profileSlice.actions;
export default profileSlice.reducer;
