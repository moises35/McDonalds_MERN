import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { isAuthorized } from '../utils/auth'

const ThumbWrapper = styled.div`
    padding: 25px 15px;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); 
    margin-bottom: 16px;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }
`
const ImgBox = styled.div`
    height: 120px;
    margin-bottom: 20px;
    width: 100%;
    position: relative;

    img {
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
        position: absolute;
        bottom: 0;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
`

const Btn = styled.button`
    color: #FCAE1E;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    background: none;
    border: 1px solid #FCAE1E;
    padding: 6px 14px;
    margin-top: 5px;
    line-height: 16px;
    border-radius: 20px;

    &:hover, &:focus {
        color: #fff;
        background: #FCAE1E;
        box-shadow: none;
    }
`



const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([])
    const navegar = useNavigate();

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
        if (!isAuthorized()) {
            navegar('/')
        } else {
            axios.get('https://mcdonaldsnode.onrender.com/user/favorites', { withCredentials: true })
                .then(res => {
                    console.log(res.data.favoritos)
                    setFavoritos(res.data.favoritos)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [navegar])

    const agregarCarrito = (name, price) => {
        const dataToSend = {
            name,
            price
        }
        axios.put("https://mcdonaldsnode.onrender.com/user/pedidos/add", dataToSend, { withCredentials: true })
            .then(res => {
                console.log(res);
                actionToast("success", `🛒${name} agregado a pedidos`);
            })
            .catch(err => {
                console.log(err);
                actionToast("error", `😢${name} no se pudo agregar a pedidos`);
            })
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
                <h2 className="encabezadoCarroucel">Favoritos</h2>
                {/* Crear un row que almacene hasta 3 elementos y que esten centrados */}
                <div className="row justify-content-center" style={{marginTop: "16px"}}>
                        { favoritos.length === 0 && <h4 style={{textAlign: "center", color: 'white'}}>No hay favoritos</h4> }
                        {/* Iteramos sobre el arreglo favoritos */}
                        {favoritos.map((item) => {
                            return (
                                <div key={item.name} className="col-sm-3">
                                    <ThumbWrapper>
                                        <ImgBox>
                                            <img src={item.urlImg} className="img-fluid" alt={item.name} />
                                        </ImgBox>
                                        <div className="thumb-content">
                                            <h4 style={{fontSize: "18px", marginBottom: "5px"}}>{item.name}</h4>
                                            <p style={{marginBottom: "5px", fontSize: "13px", padding: "2px 0"}}><b>${item.price}</b></p>
                                            <Btn onClick={() => agregarCarrito(item.name, item.price)}>Add to Cart</Btn>
                                        </div>
                                    </ThumbWrapper>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Favoritos