import { useState } from 'react';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../redux/actions';

function ContactForm({ handleSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();


  const handleFormSubmit = event => {
    event.preventDefault();

    // funkcja sprawdza, czy pole name nie jest puste. Jeśli jest, przerywa dalsze wykonanie funkcji
    if (name.trim() === '') return;

    // funkcja tworzy nowy obiekt zawierający wartości wprowadzone przez użytkownika dla  oraz unikalne id wygenerowane przez nanoid()
    const newContact = {
      name,
      number,
      id: nanoid()
    };


    //wysyła akcję addContact(newContact) do store'a za pomocą funkcji 'dispatch'
    dispatch(addContact(newContact));


    //po wysłaniu akcji czyszczone są pola formularza 
    setName('');
    setNumber('');
  };

   
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
    <div>
      <form className={css['form-container']} onSubmit={handleFormSubmit}>
        <p>Name:</p>
        <label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <p>Number:</p>
        <label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={css['submit-button']} type="submit" method="POST">
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
