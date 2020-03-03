const mongoose = require("mongoose");

const dbConnection = () =>
    mongoose.connect(
        "mongodb+srv://admin:goit-root-mode2020@homeworks-i2wq4.mongodb.net/db-contacts?retryWrites=true&w=majority",
        { useUnifiedTopology: true, useNewUrlParser: true },
        err => {
            if (err) {
                console.log("Error  related to DB has occurred:", err);
                process.exit(1);
            }
            console.log("Database connection successful!");
        }
    );

module.exports = dbConnection;