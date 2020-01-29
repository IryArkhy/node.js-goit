const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
const { promisify } = require("util");

// const contactsPath = path.resolve("db", "contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");
// const contacts = JSON.parse(fs.readFile(contactsPath, { encoding: "utf-8" }));

//Var1-----------
// function listContacts() {
//   const contacts = fs.readFileSync(contactsPath, { encoding: "utf-8" });
//   return JSON.parse(contacts);
// }

//Var2-----------
const listContacts = () =>
  JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf-8" }));

//Var 1---------
// const getContactById = contactId =>
//   listContacts().find(contact => {
//     if (typeof contact.id === "number") return contact.id === Number(contactId);
//     return contact.id === contactId;
//   });

//Var 2-----------

const getContactById = contactId =>
  listContacts().find(contact =>
    typeof contact.id === "number"
      ? contact.id === Number(contactId)
      : contact.id === contactId
  );

function removeContact(contactId) {
  const newContactsList = listContacts().filter(contact =>
    typeof contact.id === "number"
      ? contact.id !== Number(contactId)
      : contact.id !== contactId
  );

  fs.writeFileSync(contactsPath, JSON.stringify(newContactsList), err => {
    if (err) return console.log(err);
  });
}

///Ended here - the function doesn't work
const addContact = (name, email, phone) => {
  const contacts = listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone
  };
  const newContactsList = contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(newContactsList), err => {
    if (err) return console.log(err);
  });
  return newContact;
};

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf8", (err, res) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const contacts = JSON.parse(res);
//     const latsContact = contacts[contacts.length - 1];

//     const contact = {
//       id: latsContact.id + 1,
//       name,
//       email,
//       phone
//     };
//     contacts.push(contact);
//     fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log("Contact is Added");
//     });
//   });
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
