const User = require('./../models/users.model');
const passport = require('passport');

const createUser = (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    User.findOne({ userName: userName })
        .then(user => {
            if (user) {
                res.json({ message: 'El usuario ya existe en la base de datos' });
            } else {
                const newUser = new User({ firstName, lastName, userName, password });
                newUser.password = newUser.encryptPassword(password);
                newUser.save()
                    .then(() => res.json({ message: 'Usuario creado correctamente' }))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
}

const loginUser =   (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // return res.json({ message: 'Usuario o contraseña incorrectos' });
            return res.json(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Usuario autenticado correctamente' });
        });
    })(req, res, next);
}

const logoutUser = (req, res) => {
    req.logout();
    res.json({ message: 'Usuario desautenticado correctamente' });
}

            



module.exports = {
    createUser,
    loginUser,
    logoutUser
}