// ContactList.js
import React from 'react';

export const ContactList = ({ contacts, updateContact, deleteContact, onEdit }) => {
  return (
    <div>
      <h2 className='heading-Cont'> <i class="fa-regular fa-address-card"></i>   Contacts</h2>
      <ol className='listContainer'>
        {contacts.map(contact => (
          <li key={contact.id} className='contactList'>
            <div>
              <div className="title"> Name: {contact.name}</div>
              <div className='email'>    Email: {contact.email}</div>
              <div className='phoneNo'>    Phone No.: {contact.phone}</div>
            </div>

            <div className='button-ctn'>
              <button onClick={() => onEdit(contact)}>
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={() => deleteContact(contact.id)} className='delete-btn'>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
