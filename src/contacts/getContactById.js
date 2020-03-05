const Contact = require("./contact");

const getContactById = (req, res) => {
    const { contactId } = req.params;

    Contact.findById(contactId)
        .then(contact => {
            if (!contact) return res.status(404).json({ contact: contact });
            res.json({ contact: contact });
        })
        .catch(err => res.status(400).json({ error: err }));
}
module.exports = getContactById;