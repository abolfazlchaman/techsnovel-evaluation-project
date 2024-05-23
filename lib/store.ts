import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import userDetailsReducer from './features/users/userDetailsSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        userDetails: userDetailsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;