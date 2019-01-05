const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log(token);
        const decoded = jwt.verify(token, 'TOPSECRET');
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({message: 'unauthorized'});
    }
};