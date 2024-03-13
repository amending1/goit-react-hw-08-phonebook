import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const setFilter = createAction('filter/set');

const BASE_URL = 'https://connections-api.herokuapp.com/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  const { getState } = thunkAPI;
  const state = getState();
  const token = state.auth.token;
  
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while fetching contacts:', error);
  }
});

export const addContact = createAsyncThunk('contacts/save', async (contact, thunkAPI) => {
  try {
    const response = await axios.post(BASE_URL, contact);
    return response.data;
  } catch (error) {
    console.error('Error while adding contact:', error);
    return thunkAPI.rejectWithValue(error.message); //  umożliwia przechwytywanie błędów i przekazywanie ich z powrotem do Redux Toolkit. Dzięki temu aplikacja będzie mogła zareagować na błąd poprawnie, np. wyświetlając stosowne komunikaty dla użytkownika
  }
});

export const deleteContact = createAsyncThunk('contacts/delete', async (contactId, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/${contactId}`);
    return contactId;
  } catch (error) {
    console.error('Error while deleting contact:', error);
  }
});

//Akcje Redux są wykonywane w odpowiedzi na interakcje użytkownika lub zdarzenia w aplikacji, część tych akcji wykonuje zapytania do serwera za pomocą Axios
//Akcje to obiekty, które opisują zmianę stanu aplikacji. Mam trzy akcje: addContact, deleteContact, setFilter. Redux Toolkit pozwala na tworzenie akcji za pomocą 'createAction'
