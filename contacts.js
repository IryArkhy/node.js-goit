const path = require('path');
const fs = require('fs');

const contactsPath = path.resolve('db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(JSON.parse(res));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const contacts = JSON.parse(res);
    const neededContact = contacts.find(contact => {
      if (contact.id === contactId) return contact;
    });
    if (neededContact.length === 0) {
      console.log('ID not found');
      return;
    }
    console.table(neededContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const contacts = JSON.parse(res);
    const newContactsList = contacts.filter(
      contact => contact.id !== contactId,
    );

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Contacts removed');
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const contacts = JSON.parse(res);
    const latsContact = contacts[contacts.length - 1];

    const contact = {
      id: latsContact.id + 1,
      name,
      email,
      phone,
    };
    contacts.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Contacts Added');
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
