const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    flied: {
        type: String,
        required: true
    },
    tokens: [
        {   
            token: {
                type: String
            }
        }
    ]
});

userSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        console.log("error:::", error);
    }
}


const User = new mongoose.model('User', userSchema);

module.exports = User;