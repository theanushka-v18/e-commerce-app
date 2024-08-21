const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization;
    
    console.log('authorization', authorization);
    if(!authorization) return res.status(401).json('token not found');
    
    // extract jwt token from request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'unauthorized'});

    try {

        // verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // attach user information to the user's object
        req.user = decoded;
        next();

    } catch(error) {
        res.status(401).json({error : 'Invalid token'});
    }
}

// generate token

const generateToken = (userData) => {
    // generate new JWT token using user data
    const payload = {
        ...userData,
        iat: Date.now() // Adding a timestamp ensures each token is unique

    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : '30s'});
}

module.exports = {jwtAuthMiddleware, generateToken};