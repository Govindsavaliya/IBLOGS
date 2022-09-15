const jwt = require("jsonwebtoken");
require("dotenv").config();
const chapter = require("../model/user.model");

const userSchema = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("token:::::::::", token);

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("verifyUser::",verifyUser);

        const admin = await chapter.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = admin;
        next();
    } catch (error) {
        res.status(401).send('Not Match Data');
    }
};

module.exports = userSchema;