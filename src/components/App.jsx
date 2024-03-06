import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import PrivateRoute from './PrivateRoute.jsx';
// import RestrictedRoute from './RestrictedRoute.jsx';
// import UserMenu from './UserMenu.jsx';
import ContactsPage from '../pages/ContactsPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import { refreshUser } from '../redux/auth/operations.js';
import { useDispatch } from 'react-redux';

export function App() {
  //Za pomocą hooka 'useDispatch' pobieram funkcję 'dispatch', która pozwala na wysyłanie akcji do store'a
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// w App.jsx definiuję routing za pomocą react-router-dom oraz renderuję komponent nawigacji (Navigation) i komponenty stron (LoginPage, RegisterPage, ContactsPage). Tu też używam Redux do pobierania danych użytkownika poprzez akcję refreshUser
