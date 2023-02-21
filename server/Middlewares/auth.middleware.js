const jwt = require('jsonwebtoken');
const User = require('./../models/users.model')
const { promisify } = require('util');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
const decryptJWT = async (token) => {
    const jwtVerify = promisify(jwt.verify);
    return await jwtVerify(token, JWT_SECRET); 
}

const protect = async (req, res, next) => {
    // 1) Obtenemos el token
    let token;
    if(req.cookies) {
        token = req.cookies.token;
    }

    // 2) Verificamos que el token exista
    if (!token || token === 'expiredToken') {
        return res.status(401).json({
            status: 'unauthorized',
            message: 'No esta autorizado para acceder a este recurso'
        });
    }

    // 3) Verificamos que el token sea valido
    const jwtInfo = await decryptJWT(token);

    // 4) Verificamos que el usuario exista
    const user = await User.findById(jwtInfo.id);
    if (!user) {
        return res.status(401).json({
            status: 'unauthorized',
            message: 'No esta autorizado para acceder a este recurso'
        });
    }
    req.user = user;
    next();
}


module.exports = {
    protect,
    decryptJWT
}