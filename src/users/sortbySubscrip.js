const Users = require("./users.model");
const errorHandler = require("../helpers/respondError");
const resultHandler = require("../helpers/respondResult");

const getSortedUsersBySubscription = (req, res) => {
    const { sub } = req.query;

    Users.find({ subscription: sub })

        .select({ email: 1, subscription: 1, _id: 0 })
        .then(users => resultHandler(users, res))
        .catch(err => errorHandler(err, res));
};
module.exports = getSortedUsersBySubscription;