const Users = require("../users/users.model");

module.exports = (req, res) => {
    const body = req.body;

    Users.findOne({ email: body.email })
        .then(user => {
            if (!user) return res.status(404).json({ error: "Not authorized" });

            const passwordCompare = user.validatePassword(body.password);

            if (!passwordCompare)
                return res.status(401).json({ error: "Password or email is invalid" });

            user.getJWT();
            res.status(200).json("Logout successfull");
        })
        .catch(err => res.status(500).json({ message: err.message }));
};