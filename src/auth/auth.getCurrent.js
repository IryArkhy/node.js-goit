const getCurrent = (req, res) => {
    res.json(
        req.user.getPublicFieldsCurrent()
    );
};
module.exports = getCurrent;