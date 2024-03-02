import React from 'react';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import Filter from '../components/Filter';

function ContactsPage() {
return (
    <div>
        <h1>Contacts</h1>
        <ContactForm />
        <Filter />
        <ContactList />
    </div>
)
}

export default ContactsPage;