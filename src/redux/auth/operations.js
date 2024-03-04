import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    // clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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

//tu mam operacje asynchroniczne, takie jak wylogowanie się użytkownika i odświeżanie danych użytkownika