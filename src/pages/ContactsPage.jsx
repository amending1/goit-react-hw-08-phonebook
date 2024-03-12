import React, { useEffect} from 'react';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import Filter from '../components/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../redux/actions.js';
import { setFilter } from '../redux/reducers.js';
import { styled } from '@mui/system';
import { Container, Typography } from '@mui/material';


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


  //na podstawie zależności [dispatch] apka sprawdza, czy są zapisane kontakty w localStorage. Jeśli są zapisane, są one parsowane z localStorage i wysyłane do store'a za pomocą akcji 'addContact'
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //ta funkcja jest wywoływana w momencie przesłania formularza z danymi kontaktu. Wysyła akcję 'addContact' do store'a z nowym kontaktem
  // const handleSubmit = contact => {
  //   dispatch(addContact(contact));
  // };
  

  //ta funkcja jest przekazywana do komponentu ContactList jako callback przy usuwaniu kontaktu.Po kliknięciu przycisku usuwania, funkcja wysyła akcję 'deleteContact' z identyfikatorem usuwanego kontaktu
  const handleDeleteContact = contactId=> {
    dispatch(deleteContact(contactId));
  };

  // ta funkcja jest wywoływana przy zmianie wartości pola filtru. W tej funkcji wartość pola jest wysyłana za pomocą akcji 'setFilter' do store'a
  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value.toLowerCase()));
  };

  // wyfiltrowane kontakty są przekazywane do komponentu 'ContactList' jako właściwość contacts
  const filteredContacts = contacts?.filter(contact =>
    contact.name?.toLowerCase().includes(filter?.toLowerCase())
  );

  return (
    <StyledContainer>
      <Typography variant="h3">Phonebook</Typography>
      <ContactForm />
      <Typography variant="h4">Contacts</Typography>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {/* Sprawdzenie, czy filteredContacts istnieje przed przekazaniem go do ContactList */}
      {filteredContacts ? (<ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />) : (
        <p>Loading...</p>
      )}
    </StyledContainer>
  );
}

export default ContactsPage;

//strona, na której wyświetlane są kontakty użytkownika. Komunikuje się z Redux, aby pobrać i wyświetlić listę kontaktów.
