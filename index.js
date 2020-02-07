const express = require("express");
const app = express();
const cors = require("cors");
// const logger = require("morgan"); //for "development"
const listActions = require("./contacts");

const port = process.env.PORT || 5000;

//for "development"
// app.use(logger("dev"));

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/contacts", (req, res) => {
  const contacts = listActions.listContacts();
  res.status(200).json({ contacts });
});

app.get("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;
  const contact = listActions.getContactById(contactId);
  if (!contact)
    return res.status(404).json({ message: "Contact is not found" });
  res.status(200).json(contact);
});
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    return res.status(422).json({
      message: "Some fields are missing"
    });
  }
  const newContact = listActions.addContact(name, email, phone);
  res.status(201).json({ newContact });
});

app.delete("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;
  listActions.removeContact(contactId);
  res.status(200).json({ contactId, message: "Contact has been removed" });
});

app.patch("/api/contacts", (req, res) => {
  res.status(400).json({
    message: "Method @PATCH not have userId in path"
  });
});

app.patch("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name & !phone & !email) {
    return res.status(400).json({
      message: "Some fields are missing"
    });
  }

  listActions.updateContact(contactId, name, email, phone);
  res.status(200).json({ contact: listActions.getContactById(contactId) });
});

app.use("*", (req, res) =>
  res.status(404).send(`This path ${req.url} cannot be found`)
);
app.use((err, req, res) =>
  res.status(500).json({
    error: err.message
  })
);

//for "development"
// app.listen(port, () => console.log(`Server started on port ${port}`));

