import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer, filterReducer } from './reducers.js';

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer
  }
});

//tu definiuję reduktory, które będą zarządzać poszczególnymi częścimi stanu aplikacji
// mam tu dwa reducery: 'contactsReducer ' (zarządza listą kontaktów) i 'filterReducer' (zarządza filtrem dla kontaktów). To są funkcje, które określają, jak stan aplikacji zmienia się w odpowiedzi na akcje.