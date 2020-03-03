const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = () =>
  JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf-8" }));

const getContactById = contactId =>
  listContacts().find(contact => contact.id === contactId);

function removeContact(contactId) {
  const newContactsList = listContacts().filter(
    contact => contact.id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(newContactsList), err => {
    if (err) return console.log(err);
  });
}

const addContact = (name, email, phone) => {
  const contacts = listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone
  };
  contacts.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts), err => {
    if (err) return console.log(err);
  });
  return newContact;
};

const updateContact = (contactId, name, email, phone) => {
  const contacts = [...listContacts()];

  contacts.forEach(contact => {
    if (contact.id === contactId) {
      name ? (contact.name = name) : contact.name;
      email ? (contact.email = email) : contact.email;
      phone ? (contact.phone = phone) : contact.phone;
    }
  });
  fs.writeFileSync(contactsPath, JSON.stringify(contacts));
  return contacts;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};



