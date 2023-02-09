const User = require('./../models/users.model');

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

// const loginUser = (req, res) => {
//     const { userName, password } = req.body;



module.exports = {
    createUser
}