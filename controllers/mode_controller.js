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
        const result = await user.save()
        res.status(201).json(result)
    } catch (error) {
        res.status(408).json({ message: "User Register Failed !" }, error)
    }
};



//  login function
const loginUser = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        await User.findOne({ email: email }).then((user) => {
            if (!user) {
                res.status(404).json({ message: "User Not Found !" })
            } else {
                bcrypt.compare(password, user.password, (err, data) => {
                    if (data) {
                        const token = jwt.sign({ user }, "h4d5fe5");
                        res.status(200).json({ message: " Login Successfully", accessToken: token })
                    } else {
                        res.status(401).json({ message: " password error" })
                    }
                });
            }
        });
    } catch (error) {
        res.status(409).json({ message: "User login Failed !" }, error)
    }
};


// create article
const createArticle = async(req, res) => {
    try {
        const title = req.body.title
        const article = new Article({
            id: req.body.id,
            username: req.body.username,
            title: req.body.title,
            body: req.body.body,
        });
        const result = await article.save()
        res.status(200).json({ message: "article created by !", title });
    } catch (error) {
        res.status(408).json({ message: "article created Failed !" }, error);
    }
};


const getArticles = async(req, res, ) => {
    try {
        const result = await Article.find()
        res.status(200).json(result);
    } catch (error) {
        res.status(409).send(error);
    }
};

module.exports = {
    registerUser,
    createArticle,
    getArticles,
    loginUser,
};