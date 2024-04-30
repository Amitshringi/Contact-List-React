// AddContactForm.js
import React, { useState, useEffect } from 'react';

export const AddContactForm = ({ addContact, selectedContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
      setPhone(selectedContact.phone);
    }
  }, [selectedContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name,
      email,
      phone
    };
    addContact(contact);
    setName('');
    setEmail('');
    setPhone('');

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2 className='form-hed'>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder='Phone Number'
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
