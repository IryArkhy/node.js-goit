const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 40,
        minlength: 3
    },
    email: {
        type: String,
        index: true,
        unique: true,
        trim: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    }

})

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("Contact", contactSchema, "contacts");
module.exports = Contact;