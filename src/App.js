// App.js
import React, { useState , useEffect} from 'react';
import { AddContactForm } from './Components/AddContactForm';
import { ContactList } from './Components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addContact = async (contact) => {
    try {
      const existingContactIndex = contacts.findIndex((c) => c.id === contact.id);
      if (existingContactIndex !== -1) {
        // Update existing contact
        const updatedContacts = [...contacts];
        updatedContacts[existingContactIndex] = { ...updatedContacts[existingContactIndex], ...contact };
        setContacts(updatedContacts.reverse());
      } else {
        // Add new contact
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact),
        });
        const data = await response.json();
        setContacts([data, ...contacts]);
      }
    } catch (error) {
      console.error('Error adding/updating the contact', error);
    }
  };

  const updateContact = async (id, updatedContactData) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContactData),
      });
      const data = await response.json();
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? {  data, ...contact } : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error updating the contact', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.log('Error deleting the contact', error);
    }
  }

  const handleEdit = (contact) => {
    setSelectedContact(contact);
  }

  return (
    <div className="App">
      <h1>  <i className="fa-regular fa-address-book"></i> Contact List App</h1>
      <AddContactForm addContact={addContact} selectedContact={selectedContact} />
      <ContactList
        contacts={contacts}
        updateContact={updateContact}
        deleteContact={deleteContact}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
