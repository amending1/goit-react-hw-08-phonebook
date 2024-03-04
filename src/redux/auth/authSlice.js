import { createSlice } from '@reduxjs/toolkit';
import { register } from './operations.js';

const initialState = {
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {state.loading = true})
        builder.addCase(register.fulfilled, (state, action) => {
            console.log({action});
            state.loading = false; })
        builder.addCase(register.rejected, () => {})
    },
});

export const authReducer = authSlice.reducer;