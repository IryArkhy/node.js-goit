const Contact = require("./contact");

const createContact = (req, res) => {
    const contactData = req.body;
    const newContact = new Contact(contactData);
    newContact
        .save()
        .then(result =>
            res.status(201).json({
                result
            }))
        .catch(err => res.status(400).json({ error: err }));
}
module.exports = createContact;