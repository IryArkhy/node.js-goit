const argv = require('yargs').argv;
const listActions = require('./contacts');
// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listActions.listContacts();
      break;

    case 'get':
      listActions.getContactById(id);
      break;

    case 'add':
      listActions.addContact(name, email, phone);
      break;

    case 'remove':
      listActions.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
