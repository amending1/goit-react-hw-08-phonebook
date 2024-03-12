import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/actions.js';
import { styled } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    //destrukturyzuję właściwości obiektu event.target, aby uzyskać dostęp do name (nazwa pola) oraz value (wartość wprowadzona przez użytkownika w polu formularza), które są przesyłane przez zdarzenie onChange
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
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

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="p">Name:</Typography>
      <TextField
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <Typography variant="p">Number:</Typography>
      <TextField
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ width: '120px', borderRadius: '3px', alignSelf: 'center' }}
      >
        Add contact
      </Button>
    </FormContainer>
  );
}

export default ContactForm;

//tu mam komponent formularza do dodawania nowych kontaktów. Po wypełnieniu formularza i przesłaniu go, dane są przesyłane do Redux za pomocą akcji addContact.
