import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
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
    status: 'idle',
    error: null,
    page: 1,
    totalPages: 1,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: Omit<User, 'id'>) => {
    const response = await axios.post(`https://reqres.in/api/users`, user);
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }: { id: number, user: Omit<User, 'id'> }) => {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            state.totalPages = Math.ceil(state.users.length / 8);
        },
        updateUserState: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUserState: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload === undefined) {
                state.users = [];
            } else {
                state.users = state.users.filter(user => user.id !== action.payload);
                state.totalPages = Math.ceil(state.users.length / 8);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const fetchedUsers = action.payload.data;
                state.users = [...state.users, ...fetchedUsers];
                state.totalPages = action.payload.total_pages;
                state.users = state.users.filter((user, index, self) => self.findIndex(u => u.id === user.id) === index);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const existingUserIndex = state.users.findIndex(user => user.id === updatedUser.id);
                if (existingUserIndex !== -1) {
                    state.users[existingUserIndex] = updatedUser;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    },
});

export const { setPage, addUser, updateUserState, deleteUserState } = userSlice.actions;

export const selectAllUsers = (state: { users: UserState }) => state.users.users;
export const getUserStatus = (state: { users: UserState }) => state.users.status;
export const getUserError = (state: { users: UserState }) => state.users.error;
export const getPage = (state: { users: UserState }) => state.users.page;
export const getTotalPages = (state: { users: UserState }) => state.users.totalPages;

export default userSlice.reducer;
