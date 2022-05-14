import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateAxiosClientCredential } from 'api/axios';
import { ApiError, AuthService, ResendCodeReqDTO, SignupReqDTO, VerifyCodeReqDTO } from 'client';

// First, create the thunk
export const fetchSignup = createAsyncThunk('users/fetchSugnup', async (request: SignupReqDTO) => {
    const response = await AuthService.signupUserApiAuthSignupPost(request);
    return response;
});
export const fetchVerifyCode = createAsyncThunk('users/fetchVerifyCode', async (request: VerifyCodeReqDTO) => {
    const resp = await AuthService.verifyCodeApiAuthVerifyCodePost(request);
    return resp;
});

export const fetchResendCode = createAsyncThunk('users/fetchResendCode', async (request: ResendCodeReqDTO) => {
    const response = await AuthService.resendCodeApiAuthResendCodePost(request);
    return response;
});

export const fetchLoginUser = createAsyncThunk(
    'users/fetchLoginUser',
    async (request: { username: string; password: string }) => {
        const response = await AuthService.loginUserApiAuthLoginPost(request);
        if (response.access_token) {
            localStorage.setItem('authToken', response.access_token);
            localStorage.setItem('username', request.username);
        }
        return { ...response, ...request };
    },
);

export const fetchCheckAuthConnection = createAsyncThunk('users/fetchCheckAuthConnection', async () => {
    try {
        const response = await AuthService.currentUserApiAuthMeGet();
        return { ...response };
    } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        updateAxiosClientCredential(undefined);
        console.error('in fetchCheckAuthConnection', err, (err as ApiError).statusText);
    }
});

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
        authentificate: (state, action: PayloadAction<{ userEmail?: string }>) => {
            state.userEmail = action.payload.userEmail;
        },
        logout: () => {
            localStorage.removeItem('authToken');
            updateAxiosClientCredential(undefined);
            return initialState;
        },
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
            state.authentificateError = undefined;
        });
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.authentificationLoading = false;
            state.userEmail = action.payload.username;
        });
        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            state.authentificationLoading = false;
            state.authentificateError = action.error.message;
        });
        builder.addCase(fetchCheckAuthConnection.fulfilled, (state, action) => {
            state.authentificationLoading = false;
            state.userEmail = action.payload?.email;
        });
    },
});

export const { authentificate, logout } = profileSlice.actions;
export default profileSlice.reducer;
