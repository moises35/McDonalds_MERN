const User = require('./../models/users.model');
const jwt = require('jsonwebtoken');
const { decryptJWT } = require('./../middlewares/auth.middleware');
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
        expires: new Date(Date.now() + 1000 * 60 * 60),
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
        expires: new Date(Date.now() + 10000),
        httpOnly: NODE_ENV === 'production' ? true : false,
        secure: NODE_ENV === 'production' ? true : false,
    };

    res.cookie('token', 'expiredToken', options);

    res.status(200).json({ status: 'success' });
}

const updateUser = (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    // Verificamos que todos los campos esten llenos
    if (!firstName || !lastName || !userName || !password) {
        res.status(400).json({ message: 'Por favor, rellene todos los campos' });
    } else {
        // Desciframos el token
        const token = req.cookies.token;
        decryptJWT(token)
            .then(jwtInfo => {
                console.log(jwtInfo);
                // Verificamos que el usuario exista
                User.findById(jwtInfo.id)
                    .then(user => {
                        if (!user) {
                            res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                        } else {
                            // Actualizamos los datos del usuario
                            user.firstName = firstName;
                            user.lastName = lastName;
                            user.userName = userName;
                            user.password = user.encryptPassword(password);
                            user.save()
                                .then(user => {
                                    user.password = undefined;
                                    res.status(200).json({ status: 'success', user });
                                })
                                .catch(err => res.json(err));
                        }
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    }
}

const agregarFavorito = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        const { producto } = req.body;
                        console.log(producto);
                        user.favoritos.push(producto);
                        user.save()
                            .then(() => {
                                res.status(200).json({ status: 'success' });
                            })
                            .catch(err => res.json(err));
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}

const eliminarFavorito = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        const { producto } = req.params;
                        user.favoritos.pull(producto);
                        user.save()
                            .then(() => {
                                res.status(200).json({ status: 'success' });
                            })
                            .catch(err => res.json(err));
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}

const getAllPedidos = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        res.status(200).json({ status: 'success', pedidos: user.pedidos });
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}

const addPedido = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        const { name, price } = req.body;
                        const dataToPush = {
                            name,
                            price
                        }
                        // Verificamos si el nombre del producto ya se encuentra dentro del array de pedidos, en caso de ser asi solo aumentamos la cantidad
                        const index = user.pedidos.findIndex(pedido => pedido.name === dataToPush.name);
                        let accion = '';
                        if (index !== -1) {
                            user.pedidos[index].cantidad += 1;
                        } else {
                            dataToPush.cantidad = 1;
                            user.pedidos.push(dataToPush);
                        }
                        // En caso de que el producto no se encuentre en el array de pedidos, lo agregamos y en caso de que si se encuentre, solo aumentamos la cantidad
                        user.updateOne({ $set: { pedidos: user.pedidos } })
                            .then(() => {
                                res.status(200).json({ status: 'success' });
                            }
                            )
                            .catch(err => res.json(err));

                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}

const deletePedido = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        const { name, price } = req.body;
                        const dataToPush = {
                            name,
                            price
                        }
                        // Verificamos si el nombre del producto ya se encuentra dentro del array de pedidos, en caso de ser asi solo disminuimos la cantidad, en caso de que la cantidad sea 1, eliminamos el producto del array
                        const index = user.pedidos.findIndex(pedido => pedido.name === dataToPush.name);
                        if (index !== -1) {
                            if (user.pedidos[index].cantidad === 1) {
                                user.pedidos.pull(user.pedidos[index]);
                            } else {
                                user.pedidos[index].cantidad -= 1;
                            }
                            user.updateOne({ $set: { pedidos: user.pedidos } })
                                .then(() => {
                                    res.status(200).json({ status: 'success' });
                                })
                                .catch(err => res.json(err));
                        }
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}

const deleteAllPedidos = (req, res) => {
    const token = req.cookies.token;
    decryptJWT(token)
        .then(jwtInfo => {
            User.findById(jwtInfo.id)
                .then(user => {
                    if (!user) {
                        res.status(400).json({ message: 'El usuario no existe en la base de datos' });
                    } else {
                        user.pedidos = [];
                        user.updateOne({ $set: { pedidos: user.pedidos } })
                            .then(() => {
                                res.status(200).json({ status: 'success' });
                            })
                            .catch(err => res.json(err));
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    agregarFavorito,
    eliminarFavorito,
    getAllPedidos,
    addPedido,
    deletePedido,
    deleteAllPedidos
}