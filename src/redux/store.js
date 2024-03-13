import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './reducers.js';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { authReducer } from './auth/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsSlice.reducer,
    // filter: filterReducer() do poprawy
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persist = persistStore(store);

//tu przechowuję dane aplikacji
//tu definiuję reduktory, które będą zarządzać poszczególnymi częściami stanu aplikacji
// mam tu dwa reducery: 'contactsReducer ' (zarządza listą kontaktów) i 'filterReducer' (zarządza filtrem dla kontaktów). To są funkcje, które określają, jak stan aplikacji zmienia się w odpowiedzi na akcje.
