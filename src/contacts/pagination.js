const Contacts = require("./contact");
const errorHandler = require("../helpers/respondError");
const resultHandler = require("../helpers/respondResult");

const getContactsPAGINATION = (req, res) => {
    const { page, limit } = req.query;

    const optionsPagination = {
        page: page || 1,
        limit: limit || 2,
        select: { name: 1 }
    };

    Contacts.paginate({}, optionsPagination)
        .then(contacts => resultHandler(contacts, res))
        .catch(err => errorHandler(err, res));
};
module.exports = getContactsPAGINATION;