const express = require("express");
const config = require("./src/config");
const app = express();
const cors = require("cors");
const dbConnection = require("./src/db/dbConection");
const Contact = require("./src/models/contact");
const apiRouter = require("./src/router");
const logger = require("morgan"); //for "development"
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));

dbConnection();

//----------- for "development" --------------
if (config.mode === "development") app.use(logger('dev'));

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//--------- Authorization --------------
app.use("/api", apiRouter);

//----------- Contacts -----------------
app.get("/api/contacts", (req, res) => {
  Contact.find()
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });

});

app.get("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;

  Contact.findById(contactId)
    .then(contact => {
      if (!contact) return res.status(404).json({ contact: contact });
      res.json({ contact: contact });
    })
    .catch(err => res.status(400).json({ error: err }));
});
app.post("/api/contacts", (req, res) => {
  const contactData = req.body;
  const newContact = new Contact(contactData);
  newContact
    .save()
    .then(result =>
      res.status(201).json({
        result
      }))
    .catch(err => res.status(400).json({ error: err }));
});

app.delete("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;

  Contact.findOneAndDelete({ _id: contactId })
    .then(contact => {
      if (!contact) {
        return res
          .status(404)
          .json({ contact: contact, message: `Contact is not found by this ${contactId}` });
      }

      res.json({ contact: contact, message: "Contact is  deleted successfully" });
    })
    .catch(error => res.status(400).json({ error: error }));

});

app.patch("/api/contacts", (req, res) => {
  res.status(400).json({
    message: "Method @PATCH not have contactId in path"
  });
});

app.patch("/api/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;
  const newFields = req.body;

  Contact.findByIdAndUpdate(contactId, { $set: newFields }, { new: true })
    .then(contact => {
      if (!contact)
        return res
          .status(404)
          .json({ contact: contact, message: `contact id:${contactId} was not found` });
      res.json({ contact: contact });
    })
    .catch(err => res.status(400).json({ error: err }));
});

app.use("*", (req, res) =>
  res.status(404).send(`This path ${req.url} cannot be found`)
);
app.use((err, req, res) =>
  res.status(500).json({
    error: err.message
  })
);
