const Contact = require("./contact");

const deleteContact = (req, res) => {
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

}
module.exports = deleteContact;