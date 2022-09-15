const { json } = require("express");
const jwt = require("jsonwebtoken");
const userData = require("../model/user.model");


/* ================================= Main Registration ========================================== */

exports.userRegistration = async (req, res) => {
    try {
        const userDetails = new userData({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age,
            flied: req.body.flied
        });

        console.log("user::", userDetails);

        const saveUserData = await userDetails.save();

        res.status(201).json(
            {
                message: "User Registered",
                status: 201,
                data: saveUserData
            }
        )

    } catch (error) {
        console.log("error:", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.userLogin = async (req, res) => {
    try {
        
        const email = req.body.email;
        const pass = req.body.password;

        const data = await userData.findOne({ email: email });

        const token = await data.generateauthtoken();
        console.log("token:::", token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
            httpOnly: true,
        })

        if (!data) {
            res.status(404).json(
                {
                    message: "Data Not Exists.",
                    status: 404
                }
            )
        } else {
            if(pass == data.password) {
                res.status(200).json({
                    message: "Login Successfully",
                    staus: 200,
                    data: data.id,
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "password incorrect",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("error:::::::::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.userLogout = async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((curelement)=>{
            return curelement.token !== req.token;
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "Logout Successfully",
            status: 201
        })
    } catch (error) {
        res.status(401).json({
            message: "Please Try Again..",
            status: 401,
        });
    }
}



exports.userUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await userData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    gender: req.body.gender,
                    age: req.body.age,
                    flied: req.body.flied
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update User Profile Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Something Went wrong",
                    status: 500
                })
            })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.userViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await userData.find({ _id: id });


        res.status(201).json({
            message: "View User Blog By Id",
            status: 201,
            info: {
                id: data[0]._id,
                email: data[0].email,
                username: data[0].username,
                password: data[0].password,
                gender: data[0].gender,
                age: data[0].age,
                flied: data[0].flied
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};





exports.userViewAll = async (req, res) => {
    try {
        const data = await userData.find();

        res.status(201).json({
            message: "Get All Data",
            status: 201,
            data: data
        })
    } catch (error) {
        console.log("All User:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.userCount = async (req, res) => {
    try {
        const getUser = await userData.find().count();
        res.status(201).json({
            message: "User in our system",
            status: 201,
            data: getUser
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};