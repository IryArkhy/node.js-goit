const mongoose = require("mongoose");
const { mongoDbUri } = require("../config")

const options = {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoDbUri, options);
        console.log('Mongo is connected...');
    } catch (error) {
        console.log("Eroor in DB: ", error);
        process.exit(1);
    }
};

module.exports = dbConnection;