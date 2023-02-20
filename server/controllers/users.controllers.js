const User = require('./../models/users.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const NODE_ENV = process.env.NODE_ENV;

// Firma del JWT
const signJWT = (user) => {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// Enviar token
const sendToken = (user, statusCode, req, res) => {
    const token = signJWT(user);
    
    const coookiesOptions = { 
        expires: new Date(Date.now() + 1*24*60*60*1000 ),
        httpOnly: NODE_ENV === 'production' ? true : false,
        secure: NODE_ENV === 'production' ? true : false,
    };
    console.log(coookiesOptions)

    // Guardamos el token en la cookie
    res.cookie('token', token, coookiesOptions);
    user.password = undefined;

    // Enviamos el token y el usuario
    res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};

// Controlador para crear un usuario
const createUser = (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    User.findOne({ userName: userName })
        .then(user => {
            if (user) {
                res.status(400).json({ message: 'El usuario ya existe en la base de datos' });
            } else {
                const newUser = new User({ firstName, lastName, userName, password });
                newUser.password = newUser.encryptPassword(password);
                newUser.save()
                    .then(user => {
                        user.password = undefined;
                        res.status(201).json({ status: 'Usuario creado con éxito', user })
                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
}

const loginUser = (req, res) => {
    const { userName, password } = req.body;
    // Verificamos que ambos campos no esten vacios
    if (!userName || !password) {
        res.status(400).json({ message: 'Por favor, rellene todos los campos' });
    } else {
        // Verificamos que el usuario exista en la base de datos
        User.findOne({ userName: userName })
            .then(user => {
                if (!user) {
                    res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                } else {
                    // Verificamos que la contraseña sea correcta
                    if (!user.comparePassword(password)) {
                        res.status(400).json({ message: 'La contraseña es incorrecta' });
                    } else {
                        sendToken(user, 200, req, res);
                    }
                }
            })
            .catch(err => res.json(err));
    }
}

const logoutUser = (req, res) => {
    const options = {
        expires: new Date(Date.now() + 10000 ),
        httpOnly: NODE_ENV === 'production' ? true : false,
        secure: NODE_ENV === 'production' ? true : false,
    };

    res.cookie('token', 'expiredToken', options);

    res.status(200).json({ status: 'success' });
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}