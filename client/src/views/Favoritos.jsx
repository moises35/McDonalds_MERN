import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([])

    const actionToast = (type, message) => {
        const options = {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        }

        switch (type) {
            case "success":
                toast.success(message, options)
                break;
            case "info":
                toast.info(message, options)
                break;
            case "warning":
                toast.warning(message, options)
                break;
            case "error":
                toast.error(message, options)
                break;
            default:
                toast(message, options)
                break;
        }
    }

    useEffect(() => {
        axios.get('/user/favorites')
            .then(res => {
                console.log(res.data.favoritos)
                setFavoritos(res.data.favoritos)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const agregarCarrito = (name, price) => {
        const dataToSend = {
            name,
            price
        }
        axios.put("/user/pedidos/add", dataToSend)
            .then(res => {
                console.log(res);
                actionToast("success", `🛒${name} agregado a pedidos`);
            })
            .catch(err => {
                console.log(err);
                actionToast("error", `😢${name} no se pudo agregar a pedidos`);
            })
    }

    const favoritoHandler = (e, name) => {
        e.target.classList.toggle("fa-heart-o");
        e.target.classList.toggle("fa-heart");
        e.target.classList.toggle("red");
        if (!(e.target.classList.contains("red"))) {
            axios.put("/user/favorites/delete", { name })
                .then(res => {
                    console.log(res);
                    actionToast("info", `${name} eliminado de favoritos`);
                })
                .catch(err => {
                    console.log(err);
                    actionToast("error", `${name} no se pudo eliminar de favoritos`);
                })
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container-xl">
                <div className="row">
                        {/* Iteramos sobre el arreglo favoritos */}
                        {favoritos.map((item) => {
                            return (
                                <div key={item.name} className="col-sm-3">
                                    <div className="thumb-wrapper">
                                        <span className="wish-icon"><i onClick={(e) => favoritoHandler(e, item.name)} className="fa fa-heart-o red"></i></span>
                                        <div className="img-box">
                                            <img src={item.urlImg} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="thumb-content">
                                            <h4>{item.name}</h4>
                                            <p className="item-price"><b>${item.price}</b></p>
                                            <button className="btn btn-primary" onClick={() => agregarCarrito(item.name, item.price)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Favoritos