import React from 'react';
import ContactItem from './ContactItem.jsx';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/actions.js';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();


  //po kliknięciu przycisku, funkcja wywołuje dispatch(deleteContact(id)), czyli wysyła akcję 'deleteContact' z identyfikatorem usuwanego kontaktu do store'a 
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(contact => (
        <div className={css['list-item']}>
          <ContactItem
            key={contact.id}
            name={contact.name}
            number={contact.number}
          />
          <button
            className={css['delete-button']}
            onClick={() => handleDeleteContact(contact.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;
