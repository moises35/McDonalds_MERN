const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/users.model');

passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, (userName, password, done)=> {
    // Confirmamos que el nombre de usuario exista en la base de datos
    User.findOne({userName})
        .then(user => {
            if(!user) {
                // Si no existe el usuario
                return done(null, false, {message: 'Usuario no encontrado en la base de datos'});
            } else {
                // Si existe el usuario, comparamos las contraseñas
                if(!user.comparePassword(password)) {
                    // Si las contraseñas no coinciden
                    return done(null, false, {message: 'Contraseña incorrecta'});
                } else {
                    // Si las contraseñas coinciden
                    return done(null, user, {message: 'Usuario autenticado correctamente'});
                }
            }
        })
}));

// Serializamos el usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializamos el usuario
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
