const respondResult = (data, res, statusCode = 200) => {
    res.status(statusCode).json({ result: data });
};

module.exports = respondResult;
