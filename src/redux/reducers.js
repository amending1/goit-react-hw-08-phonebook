import { createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  setFilter,
  fetchContacts,
} from './actions.js';

const initialState = {
  contacts: [],
  filter: '',
};

//Jako pierwszy argument przekazywane jest initialState.contacts, czyli początkowa wartość dla tej części stanu. W ciele reduktora używam metody builder, która pozwala na definiowanie akcji i ich obsługę.
//Za pomocą builder.addCase() okreslam, jak reducer ma reagować na akcje. W przypadku akcji 'addContact', do stanu dodawany jest nowy kontakt zawarty w action.payload. W przypadku akcji 'deleteContact', zwracana jest nowa tablica kontaktów, która jest filtrowana, aby usunąć kontakt o id zgodnym z action.payload
export const contactsReducer = createReducer(initialState.contacts, builder => {
  builder
    .addCase(fetchContacts.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    });
});

//Za pomocą builder.addCase() określam jak reducer ma reagować na akcję 'setFilter'. W przypadku tej akcji, stan filtra jest aktualizowany na podstawie action.payload, który zawiera nową wartość filtra
export const filterReducer = createReducer(initialState.filter, builder => {
  builder.addCase(setFilter, (state, action) => action.payload);
});
