import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setFilter = createAction('filter/set');

const BASE_URL = 'https://65d9c7b0bcc50200fcdc192b.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/save',
  async contact => {
    const response = await axios.post(BASE_URL, contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/remove',
  async id => {
    await axios.delete(BASE_URL + `/${id}`);
    return id;
  }
);

//Akcje to obiekty, które opisują zmianę stanu aplikacji. Mam trzy akcje: addContact, deleteContact, setFilter. Redux Toolkit pozwala na tworzenie akcji za pomocą 'createAction'