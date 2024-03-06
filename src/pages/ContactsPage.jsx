import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import Filter from '../components/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from '../redux/actions.js';
import { setFilter } from '../redux/reducers.js';
import { styled } from '@mui/system';
import { Container, Typography } from '@mui/material';
import { nanoid } from 'nanoid';

const StyledContainer = styled(Container)({
  width: '500px',
  backgroundColor: '#9aac9b',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
});

function ContactsPage() {
  //za pomocą hooka 'useSelector' pobieram fragmenty stanu z store'a, czyli listę kontaktów (contacts) i filtr (filter), który będzie używany do filtrowania kontaktów
  //za pomocą hooka 'useDispatch' pobieram funkcję 'dispatch', która pozwala na wysyłanie akcji do store'a
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //na podstawie zależności [dispatch] apka sprawdza, czy są zapisane kontakty w localStorage. Jeśli są zapisane, są one parsowane z localStorage i wysyłane do store'a za pomocą akcji 'addContact'
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //ta funkcja jest wywoływana w momencie przesłania formularza z danymi kontaktu. Wysyła akcję 'addContact' do store'a z nowym kontaktem
  // const handleSubmit = contact => {
  //   dispatch(addContact(contact));
  // };
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ name, number }));
    // funkcja sprawdza, czy pole name nie jest puste. Jeśli jest, przerywa dalsze wykonanie funkcji
    if (name.trim() === '') return;

    // funkcja tworzy nowy obiekt zawierający wartości wprowadzone przez użytkownika dla  oraz unikalne id wygenerowane przez nanoid()
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    //wysyła akcję addContact(newContact) do store'a za pomocą funkcji 'dispatch'
    dispatch(addContact(newContact));

    //po wysłaniu akcji czyszczone są pola formularza
    setName('');
    setNumber('');
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
  const filteredContacts = contacts?.filter(contact =>
    contact.name?.toLowerCase().includes(filter)
  );

  return (
    <StyledContainer>
      <Typography variant="h3">Phonebook</Typography>
      <ContactForm handleSubmit={handleSubmit} />
      <Typography variant="h4">Contacts</Typography>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </StyledContainer>
  );
}

export default ContactsPage;

//strona, na której wyświetlane są kontakty użytkownika. Komunikuje się z Redux, aby pobrać i wyświetlić listę kontaktów.
