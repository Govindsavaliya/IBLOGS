const blogData = require("../model/blog.model");

/* ================================= Blog ========================================== */


exports.blogInsert = async (req, res) => {
    try {
        const userDetails = new blogData({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            date: req.body.date,
            category: req.body.category
        });

        // console.log("user::", userDetails);

        const saveblogData = await userDetails.save();

        res.status(201).json(
            {
                message: "User Registered",
                status: 201,
                data: saveblogData
            }
        )

    } catch (error) {
        // console.log("error:", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
}


exports.blogUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await blogData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    author: req.body.author,
                    date: req.body.date,
                    category: req.body.category,
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
                    message: "Something Went Swrong",
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


exports.blogViewAll = async (req, res) => {
    try {
        const data = await blogData.find();

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


exports.blogViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await blogData.find({ _id: id });


        res.status(201).json({
            message: "View User Blog By Id",
            status: 201,
            info: {
                id: data[0]._id,
                title: data[0].title,
                description: data[0].description,
                author: data[0].author,
                date: data[0].date,
                category: data[0].category
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.blogCount = async (req, res) => {
    try {
        const getBlog = await blogData.find().count();
        res.status(201).json({
            message: "Blog in our system",
            status: 201,
            data: getBlog
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.blogByCategories = async (req, res) => {
    // console.log("jdsvhflj");
    try {
        var categories = req.body.categories;
        const data = await blogData.find({ category: categories });
        
        res.status(200).json({
            message: "View User Data By categories",
            status: 200,
            info: data
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};


exports.blogByAuthor = async (req, res) => {
    try {
        var author = req.body.author;
        console.log("author::",author);
        const data = await blogData.find({ author: author });

        res.status(201).json({
            message: "View User Data By authorname",
            status: 201,
            info: data
        })

    } catch (error) {
        console.log("error::",error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.blogDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await blogData.find({ id: id });
        const del = blogData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete User Data",
                status: 201,
                data: data
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
};

