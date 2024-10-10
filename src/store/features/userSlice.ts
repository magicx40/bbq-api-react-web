import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    username: string | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    username: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string }>) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
        },
        logout: state => {
            state.isLoggedIn = false;
            state.username = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
