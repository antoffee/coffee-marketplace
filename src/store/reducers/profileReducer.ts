import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateAxiosClientCredential } from 'api/axios';
import {
    AddressAddDTO,
    ApiError,
    AuthService,
    ProfileService,
    ResendCodeReqDTO,
    SignupReqDTO,
    VerifyCodeReqDTO,
} from 'client';

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

export const fetchDeliveryList = createAsyncThunk('users/fetchDeliveryList', async () => {
    const response = await ProfileService.getListApiProfileAddressListGet();
    return response.addresses;
});

export const fetchAddDelivery = createAsyncThunk('users/fetchAddDelivery', async (request: AddressAddDTO) => {
    const response = await ProfileService.putApiProfileAddressPut(request);
    return { ...request, id: response.address_id };
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
    secondsLeft?: number;

    verifyCodeLoading?: boolean;
    codeVerified?: boolean;
    verifyCodeError?: string;

    authentificationLoading?: boolean;
    authentificateError?: string;
    userEmail?: string;

    // userInfo?: unknown;
    userInfoLoading?: boolean;
    userInfoError?: string;

    deliveryAddresses?: AddressAddDTO[];
    deliveryAddressesLoading?: boolean;
    addDeliveryError?: string;
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
            state.signUpError = undefined;
            state.secondsLeft = undefined;
        });
        builder.addCase(fetchSignup.fulfilled, (state, action) => {
            state.signUpLoading = false;
            state.secondsLeft = action.payload.seconds_left;
        });
        builder.addCase(fetchSignup.rejected, (state, action) => {
            state.signUpLoading = false;
            console.error('in fetchSignup', action.error, action.meta);
            state.signUpError = (action.error as ApiError).statusText ?? action.error.message;
        });
        builder.addCase(fetchVerifyCode.pending, (state) => {
            state.verifyCodeLoading = true;
            state.verifyCodeError = undefined;
        });
        builder.addCase(fetchVerifyCode.fulfilled, (state) => {
            state.verifyCodeLoading = false;
            state.codeVerified = true;
        });
        builder.addCase(fetchVerifyCode.rejected, (state, action) => {
            state.verifyCodeLoading = false;
            state.verifyCodeError = (action.error as ApiError).statusText ?? action.error.message;
            console.error('in fetchVerifyCode', action.error, action.meta);
        });
        builder.addCase(fetchResendCode.pending, (state) => {
            state.verifyCodeLoading = true;
            state.verifyCodeError = undefined;
            state.secondsLeft = undefined;
        });
        builder.addCase(fetchResendCode.fulfilled, (state, action) => {
            state.verifyCodeLoading = false;
            state.secondsLeft = action.payload.seconds_left;
        });
        builder.addCase(fetchResendCode.rejected, (state, action) => {
            state.verifyCodeLoading = false;
            state.verifyCodeError = (action.error as ApiError).statusText ?? action.error.message;
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

        builder.addCase(fetchDeliveryList.pending, (state) => {
            state.deliveryAddressesLoading = true;
        });
        builder.addCase(fetchDeliveryList.fulfilled, (state, action) => {
            state.deliveryAddresses = action.payload;
            state.deliveryAddressesLoading = false;
        });
        builder.addCase(fetchDeliveryList.rejected, (state) => {
            state.deliveryAddressesLoading = false;
            // console.warn(action.error, action.meta);
        });

        builder.addCase(fetchAddDelivery.pending, (state) => {
            state.deliveryAddressesLoading = true;
        });
        builder.addCase(fetchAddDelivery.fulfilled, (state, action) => {
            state.deliveryAddresses = (state.deliveryAddresses ?? []).concat(action.payload);
            state.deliveryAddressesLoading = false;
        });
        builder.addCase(fetchAddDelivery.rejected, (state, action) => {
            state.deliveryAddressesLoading = false;
            state.addDeliveryError = (action.error as ApiError).statusText ?? action.error;
            // console.warn(action.error, action.meta);
        });
    },
});

export const { authentificate, logout } = profileSlice.actions;
export default profileSlice.reducer;
