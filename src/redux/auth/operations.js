import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorizzation = '';
};

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', credentials)
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error)
 {
  return thunkAPI.rejectWithValue(error.message);
 }}
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    if (!token) {
      return thunkAPI.rejectWithValue('No token...');
    }

    try {
      const response = await axios.get("/users/me");
      setAuthHeader(token);
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//tu mam operacje asynchroniczne, takie jak wylogowanie się użytkownika i odświeżanie danych użytkownika