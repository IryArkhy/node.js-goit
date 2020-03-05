const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan"); //for "development"
const config = require("./src/config");
const apiRouter = require("./src/router");
const dbConnection = require("./src/db/dbConection");
const getAllContacts = require("./src/contacts/getAllContacts");
const getContactsPAGINATION = require("./src/contacts/pagination");
const getContactById = require("./src/contacts/getContactById");
const createContact = require("./src/contacts/createContact");
const deleteContact = require("./src/contacts/deleteContact");
const editContact = require("./src/contacts/editContact");
const deleteUser = require("./src/users/deleteUser");
const editUser = require("./src/users/editUser");
const getSortedUsersBySubscription = require("./src/users/sortbySubscrip")


const port = config.port;
app.listen(port, () => console.log(`Server started on port ${port}`));
dbConnection();

if (config.mode === "development") app.use(logger('dev'));
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//--------- Authorization --------------
app.use("/api", apiRouter);

//----------- Contacts -----------------
app.get("/api/contacts", getAllContacts);
app.get("/api/contacts/:contactId", getContactById);
app.post("/api/contacts", createContact);
app.delete("/api/contacts/:contactId", deleteContact);
app.patch("/api/contacts/:contactId", editContact);
app.patch("/api/contacts", (req, res) => {
  res.status(400).json({
    message: "Method @PATCH not have contactId in path"
  });
});

//------------ Additional tasks --------------------
// 1) Pagination
//Example: http://localhost:5000/api/contactsP?limit=5&page=3

app.get("/api/contactsP", getContactsPAGINATION);

// 2) Sort users
//http://localhost:5000/api/users?sub=free
app.get("/api/users", getSortedUsersBySubscription);

// 3) Edit users' data
//http://localhost:5000/api/users/5e5fb7304dfffc5c532a8f9a
app.patch("/api/users/:userId", editUser);

// 4) Delete usere
app.delete("/api/users/:userId", deleteUser);



app.use("*", (req, res) =>
  res.status(404).send(`This path ${req.url} cannot be found`)
);
app.use((err, req, res) =>
  res.status(500).json({
    error: err.message
  })
);
