const User = require("../models/register");
const jwt = require("jsonwebtoken");



const tokenverify = function verifytoken(Bearertoken) {
    console.log(Bearertoken);
    if (Bearertoken.startsWith('Bearer ')) {
        token = Bearertoken.slice(7, token.length).trimLeft();
    }
    if (token) {
        jwt.verify(token, 'shhhhh', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                let userid = decoded.user._id;
                User.findOne({ _id: userid }).then((result, error) => {
                    console.log(result);

                })
            }
        });
    }
}

module.exports = tokenverify;