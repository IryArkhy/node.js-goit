const Users = require("./users.model");
const editUser = (req, res) => {
    const { userId } = req.params;
    const newFields = req.body;

    Users.findByIdAndUpdate(userId, { $set: newFields }, { new: true })
        .then(user => {
            if (!user)
                return res
                    .status(404)
                    .json({ contact: user, message: `User id:${userId} was not found` });
            res.json({
                message: "Updated successfully",
                user: user.getPublicFields()
            });
        })
        .catch(err => res.status(400).json({ error: err }));
}
module.exports = editUser;