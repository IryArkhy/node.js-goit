const Contact = require("./contact");

const editContact = (req, res) => {
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
}
module.exports = editContact;