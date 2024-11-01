import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    username: string | null;
    userId: number | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    username: null,
    userId: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ username: string; id: number }>
        ) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.userId = action.payload.id;
        },
        logout: state => {
            state.isLoggedIn = false;
            state.username = null;
            state.userId = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
