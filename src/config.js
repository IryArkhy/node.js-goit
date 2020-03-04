require("dotenv").config();

module.exports = {
    mongoDbUri: process.env.MONGO_DB_URI || "mongodb://localhost:27027/app",
    port: process.env.PORT || 5000,
    mode: process.env.NODE_ENV || "development",
    appUrl: "http://localhost:5000",
    secretJwtKey: "rocketman202020"
};