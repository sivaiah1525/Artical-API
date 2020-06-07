const User = require("../models/register");
const Article = require("../models/article");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = async(req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            address: req.body.address,
        });
        const result = user.save()
        res.json({ statusCode: 201, body: { message: "new user created !" } })
    } catch (error) {
        res.json({ statusCode: 404, body: { message: "User Register Failed !" } })
    }
};



//  login function
const loginUser = (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                res.status(404).json({ statusCode: 404, body: { message: "User Not Found !" } })
            } else {
                bcrypt.compare(password, user.password, (err, data) => {
                    if (data) {
                        const token = jwt.sign({ user }, "h4d5fe5");
                        res.json({ statusCode: 201, body: { message: "User Login Successfully", accessToken: token } })
                    }
                });
            }
        });
    } catch (error) {
        res.status(404).json({ statusCode: 404, body: { message: "Invalid Credentials" } })
    }
};


// create article
const createArticle = (req, res) => {
    try {
        const article = new Article({
            username: req.body.username,
            title: req.body.title,
            body: req.body.body,
        });
        const result = article.save()
        res.json({ statusCode: 201, body: { message: "new article created !" } });
    } catch (error) {
        res.status(404).json({ statusCode: 404, body: { message: "article created Failed !" } });
    }
};


const getArticles = (req, res, ) => {
    try {
        Article.find()
            .then((result) => {
                res.send(result);
            })
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    registerUser,
    createArticle,
    getArticles,
    loginUser,
};