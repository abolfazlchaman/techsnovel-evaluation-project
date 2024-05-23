// features/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    page: number;
    totalPages: number;
}

const initialState: UserState = {
    users: [],
    status: 'loading',  // Initialize status to 'loading'
    error: null,
    page: 1,
    totalPages: 2,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.data;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setPage } = userSlice.actions;

export const selectAllUsers = (state: { users: UserState }) => state.users.users;
export const getUserStatus = (state: { users: UserState }) => state.users.status;
export const getUserError = (state: { users: UserState }) => state.users.error;
export const getPage = (state: { users: UserState }) => state.users.page;
export const getTotalPages = (state: { users: UserState }) => state.users.totalPages;

export default userSlice.reducer;
