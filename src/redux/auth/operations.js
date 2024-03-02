import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    if (!token) {
      return thunkAPI.rejectWithValue('No token...');
    }

    try {
      const res = await axios.get("/users/me");
      setAuthHeader(token);
      return res.data;
    } catch(err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);