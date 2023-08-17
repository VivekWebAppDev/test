require('dotenv').config();
const jwt = require('jsonwebtoken');
const key = process.env.tokenKeyU;

exports.sign = (id) => {
    return jwt.sign({
        id: id
    }, key)
}

exports.verify = (Head) => {
    const tk = Head.split(" ");
    const token = tk[1];
    let ans;
    jwt.verify(token, key, (err, result) => {
        if (err) {
            res.send(`error in token`)
        } else {
            ans = result;
        }
    });
    return ans
}

exports.mt = (req, res, next) => {
    const head = req.headers.authorization;
    if (head) {
        const tk = head.split(" ");
        const token = tk[1];
        jwt.verify(token, key, (err, result) => {
            if (err || result == undefined) {
                console.log(`token is not valid`);
                res.send(`token is not valid`);
            } else {
                next();
            }
        });
    } 
}

