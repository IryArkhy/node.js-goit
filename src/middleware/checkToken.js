const jwt = require("jsonwebtoken");
const config = require("../config");
const Users = require("../users/users.model");

module.exports = async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader)
        res.status(401).json({ message: "Missing auth key in header" });
    const token = tokenHeader.split("Bearer ")[1];

    try {
        const validToken = jwt.verify(token, config.secretJwtKey);
        const user = await Users.findOne({ _id: validToken.id });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: `Unauthorized: ${error.message}` });
    }
};
