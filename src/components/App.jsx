import React, { useEffect } from 'react';
import css from './phonebook.module.css';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  setFilter,
  deleteContact,
  fetchContacts,
} from '../redux/actions.js';

export function App() {
  //Za pomocą hooka 'useDispatch' pobieram funkcję 'dispatch', która pozwala na wysyłanie akcji do store'a
  const dispatch = useDispatch();

  //pomocą hooka 'useSelector' pobieram fragmenty stanu z store'a, czyli listę kontaktów (contacts) i filtr (filter), który będzie używany do filtrowania kontaktów
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  //na podstawie zależności [dispatch] apka sprawdza, czy są zapisane kontakty w localStorage. Jeśli są zapisane, są one parsowane z localStorage i wysyłane do store'a za pomocą akcji 'addContact'

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //ta funkcja jest wywoływana w momencie przesłania formularza z danymi kontaktu. Wysyła akcję 'addContact' do store'a z nowym kontaktem
  const handleSubmit = contact => {
    dispatch(addContact(contact));
  };

  //ta funkcja jest przekazywana do komponentu ContactList jako callback przy usuwaniu kontaktu.Po kliknięciu przycisku usuwania, funkcja wysyła akcję 'deleteContact' z identyfikatorem usuwanego kontaktu
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  // ta funkcja jest wywoływana przy zmianie wartości pola filtru. W tej funkcji wartość pola jest wysyłana za pomocą akcji 'setFilter' do store'a
  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value.toLowerCase()));
  };

  // wyfiltrowane kontakty są przekazywane do komponentu 'ContactList' jako właściwość contacts
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter)
  );

  return (
    <div className="App">
      <div className={css['container']}>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} handleSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
