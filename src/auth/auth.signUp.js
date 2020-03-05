const Users = require("../users/users.model");

module.exports = async (req, res) => {
    try {
        const body = req.body;

        if (!body.password || !body.email)
            res.status(422).json({ errorMessage: "Missing required fields" });

        const existingUser = await Users.findOne({ email: body.email });
        if (existingUser) return res.status(400).json({ errorMessage: "Email in use" });

        const user = new Users(body);
        const result = await user.save();
        if (!result) res.status(404).json({ error: "No such user" });

        user.getJWT()
        res.status(201).json(user.getPublicFields());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
