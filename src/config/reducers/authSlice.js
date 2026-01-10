import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: false,
        role: 'Admin'
    },

    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
        },

        setRole: (state, action) => {
            state.role = action.payload
        },

        logOut: (state) => {
            state.user = false;
            state.role = 'Admin'
        }
    }
})

export const { setLogin, setRole, logout } = authSlice.actions;

export default authSlice.reducer;