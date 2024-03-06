import React from 'react';
import ContactItem from './ContactItem.jsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/actions.js';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';

const ListItem = styled('li')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const DeleteButton = styled(Button)({
  width: '80px',
  height: '20px',
  borderRadius: '3px',
  alignSelf: 'center',
  fontSize: '14px',
});

const ContactList = ({  name, number }) => {
  const dispatch = useDispatch();

  //po kliknięciu przycisku, funkcja wywołuje dispatch(deleteContact(id)), czyli wysyła akcję 'deleteContact' z identyfikatorem usuwanego kontaktu do store'a
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ListItem>
      <Typography>{name}: {number}</Typography>
      <DeleteButton onClick={handleDeleteContact}>Delete</DeleteButton>
    </ListItem>
  );
};

//   return (
//     <ul>
//       {contacts.map(contact => (
//         <div className={css['list-item']} key={contact.id}>
//           <ContactItem name={contact.name} number={contact.number} />
//           <button
//             className={css['delete-button']}
//             onClick={() => handleDeleteContact(contact.id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </ul>
//   );
// };

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;

//tu mam komponent do renderowania listy kontaktów. Pozwala na usuwanie kontaktów poprzez akcję deleteContact.
