import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UserDetailsState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserDetailsState = {
    user: null,
    status: 'idle',
    error: null,
};

export const fetchUserDetails = createAsyncThunk('userDetails/fetchUserDetails', async (userId: number) => {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.data.data;
});

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const selectUserDetails = (state: { userDetails: UserDetailsState }) => state.userDetails.user;
export const getUserDetailsStatus = (state: { userDetails: UserDetailsState }) => state.userDetails.status;
export const getUserDetailsError = (state: { userDetails: UserDetailsState }) => state.userDetails.error;

export default userDetailsSlice.reducer;
