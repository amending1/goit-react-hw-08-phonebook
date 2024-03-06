import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

function ContactForm({ handleSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    //destrukturyzuję właściwości obiektu event.target, aby uzyskać dostęp do name (nazwa pola) oraz value (wartość wprowadzona przez użytkownika w polu formularza), które są przesyłane przez zdarzenie onChange
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
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

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

//tu mam komponent formularza do dodawania nowych kontaktów. Po wypełnieniu formularza i przesłaniu go, dane są przesyłane do Redux za pomocą akcji addContact.
