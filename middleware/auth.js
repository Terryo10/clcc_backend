const Jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('auth_token');
    if (!token) return res.status(401).send('access denied');
    try {
        const verified = Jwt.verify(token, process.env.JWT)
        req.user = verified;
        next();
    } catch (e) {
        return res.status(400).send('Invalid User')
    }
}