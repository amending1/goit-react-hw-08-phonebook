import React, { useEffect } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
// import css from './phonebook.module.css';
import Navigation from './Navigation.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import RestrictedRoute from './RestrictedRoute.jsx';
// import UserMenu from './UserMenu.jsx';
import ContactsPage from '../pages/ContactsPage.jsx';
// import HomePage from '../pages/HomePage.jsx';s
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import { refreshUser } from '../redux/auth/operations.js'
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
// import {
//   addContact,
//   setFilter,
//   deleteContact,
//   fetchContacts,
// } from '../redux/actions.js';

export function App() {
  //Za pomocą hooka 'useDispatch' pobieram funkcję 'dispatch', która pozwala na wysyłanie akcji do store'a
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  //pomocą hooka 'useSelector' pobieram fragmenty stanu z store'a, czyli listę kontaktów (contacts) i filtr (filter), który będzie używany do filtrowania kontaktów
  // USUWAM
  // const contacts = useSelector(state => state.contacts);
  // const filter = useSelector(state => state.filter);

  //na podstawie zależności [dispatch] apka sprawdza, czy są zapisane kontakty w localStorage. Jeśli są zapisane, są one parsowane z localStorage i wysyłane do store'a za pomocą akcji 'addContact'
 // USUWAM
  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  //ta funkcja jest wywoływana w momencie przesłania formularza z danymi kontaktu. Wysyła akcję 'addContact' do store'a z nowym kontaktem
   // USUWAM
  // const handleSubmit = contact => {
  //   dispatch(addContact(contact));
  // };

  //ta funkcja jest przekazywana do komponentu ContactList jako callback przy usuwaniu kontaktu.Po kliknięciu przycisku usuwania, funkcja wysyła akcję 'deleteContact' z identyfikatorem usuwanego kontaktu
     // USUWAM
  // const handleDeleteContact = id => {
  //   dispatch(deleteContact(id));
  // };

  // ta funkcja jest wywoływana przy zmianie wartości pola filtru. W tej funkcji wartość pola jest wysyłana za pomocą akcji 'setFilter' do store'a
     // USUWAM
  // const handleFilterChange = event => {
  //   dispatch(setFilter(event.target.value.toLowerCase()));
  // };

  // wyfiltrowane kontakty są przekazywane do komponentu 'ContactList' jako właściwość contacts
     // USUWAM
  // const filteredContacts = contacts.filter(contact =>
  //   contact.name?.toLowerCase().includes(filter)
  // );

//   return (
//     <div className="App">
//       <div className={css['container']}>
//         <h1>Phonebook</h1>
//         <ContactForm contacts={contacts} handleSubmit={handleSubmit} />
//         <h2>Contacts</h2>
//         <Filter filter={filter} handleFilterChange={handleFilterChange} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={handleDeleteContact}
//         />
//       </div>
//     </div>
//   );
// }

return isRefreshing ?  (
  <b>Refreshing user...</b>
  ) : (
  <Router>
    <Navigation/>
    <Routes>
      <Route path="/register" element={<RestrictedRoute redirectTo='/contacts' component={<RegisterPage />} />} />
      <Route path="/login" element={<RestrictedRoute redirectTo='/contacts' component={<LoginPage />} />} />
      <Route path="/contacts" element={<PrivateRoute redirectTo='/login' component={<ContactsPage />} />} />
    </Routes>
  </Router>
);
}

