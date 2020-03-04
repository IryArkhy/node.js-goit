const Users = require("../users/users.model");

module.exports = (req, res) => {
    const body = req.body;

    Users.findOne({ email: body.email })
        .then(user => {
            if (!user) return res.status(404).json({ error: "No such user" });

            const passwordCompare = user.validatePassword(body.password);

            if (!passwordCompare)
                return res.status(400).json({ error: "Password or email is invalid" });

            user.getJWT();
            res.status(200).json(user.getPublicFields());
        })
        .catch(err => res.status(500).json({ message: err.message }));
};
