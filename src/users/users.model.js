const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const config = require("../config");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            indexes: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        subscription: {
            type: String,
            enum: ["free", "pro", "premium"],
            default: "free"
        },
        token: {
            type: String,
            default: null
        },
    },
    { timestamps: true }
);

userSchema.methods.getPublicFields = function () {
    const returnObject = {
        user: {
            email: this.email,
            subscription: this.subscription
        },
        token: this.token
    };
    return returnObject;
};

userSchema.methods.getPublicFieldsCurrent = function () {
    const returnObject = {
        email: this.email,
        subscription: this.subscription
    };
    return returnObject;
};

userSchema.pre("save", function (next) {
    const user = this;

    if (
        (user.password && this.isModified("password")) ||
        (user.password && this.isNew)
    )
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    else return next();
});

userSchema.methods.validatePassword = function (password) {
    const compare = bcrypt.compareSync(password, this.password);
    return compare;
};

userSchema.methods.getJWT = function () {
    const preToken = jwt.sign(
        {
            id: this._id
        },
        config.secretJwtKey,
        {
            expiresIn: 180
        }
    );

    const token = preToken;

    this.token = token;
    this.save();
    return token;
};

module.exports = Users = mongoose.model("Users", userSchema);
