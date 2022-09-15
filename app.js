require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/conn");


const User = require("./model/user.model");
const Blog = require("./model/blog.model");
const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes")
app.use("/blog",blogRoutes);
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`Server Running At PORT : ${port}`);
})


