const Contact = require("./contact");
const getAllContacts = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });

}
module.exports = getAllContacts;