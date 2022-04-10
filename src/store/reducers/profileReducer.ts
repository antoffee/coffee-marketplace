import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignUp } from 'api/user/fetchSignUp';

// First, create the thunk
const fetchSignup = createAsyncThunk('users/fetchSugnUp', fetchSignUp);

interface ProfileState {
    userInfo?: unknown;
    signUpLoading?: boolean;
    userInfoLoading?: boolean;
    userInfoError?: string;
}

const initialState = {} as ProfileState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchSignup.pending, (state) => {
            state.userInfoLoading = true;
        });
        builder.addCase(fetchSignup.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.userInfoLoading = false;
        });
        builder.addCase(fetchSignup.rejected, (state) => {
            state.userInfoLoading = false;
        });
    },
});

export default usersSlice.reducer;
