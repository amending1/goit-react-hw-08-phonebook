import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const setFilter = createAction('filter/set');

const BASE_URL = 'https://connections-api.herokuapp.com/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/save', async contact => {
  try {
    const response = await axios.post(BASE_URL, contact);
    return response.data;
  } catch (error) {}
});

export const deleteContact = createAsyncThunk(
  'contacts/remove',
  async contactId => {
    await axios.delete(BASE_URL + `/${contactId}`);
    return contactId;
  }
);

//Akcje Redux są wykonywane w odpowiedzi na interakcje użytkownika lub zdarzenia w aplikacji, część tych akcji wykonuje zapytania do serwera za pomocą Axios
//Akcje to obiekty, które opisują zmianę stanu aplikacji. Mam trzy akcje: addContact, deleteContact, setFilter. Redux Toolkit pozwala na tworzenie akcji za pomocą 'createAction'
