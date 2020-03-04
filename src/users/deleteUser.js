const Users = require("./users.model");

const deleteUser = (req, res) => {
    const { userId } = req.params;

    Users.findOneAndDelete({ _id: userId })
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({ user: user, message: `user is not found by this ${userId}` });
            }

            res.json({ message: `user ${user.email} is  deleted successfully` });
        })
        .catch(error => res.status(400).json({ error: error }));
}

module.exports = deleteUser;