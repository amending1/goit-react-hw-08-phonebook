import React from 'react';
import PropTypes from 'prop-types';

// import { deleteContact } from '../redux/actions.js';
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

const ContactList = ({ contacts, onDeleteContact }) => {
 
  return (
    <ListItem>
      <Typography>{contacts}</Typography>
      <DeleteButton onClick={onDeleteContact}>Delete</DeleteButton>
    </ListItem>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;

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



//tu mam komponent do renderowania listy kontaktów. Pozwala na usuwanie kontaktów poprzez akcję deleteContact.
