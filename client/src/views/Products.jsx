import Carroucel from "../components/Carroucel"
import { useEffect, useState } from "react"
import axios from "axios"
import { isAuthorized, limpiarTodos } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {
    const [comida, setComida] = useState([])
    const [bebida, setBebida] = useState([])
    const [postre, setPostre] = useState([])
    const [otros, setOtros] = useState([])
    const navegar = useNavigate()

    useEffect(() => {
        if (!isAuthorized()) {
            navegar('/')
        }
        axios.get('/api/products')
            .then(res => {
                setComida(res.data.filter(e => e.type === "comida"))
                setBebida(res.data.filter(e => e.type === "bebida"))
                setPostre(res.data.filter(e => e.type === "postre"))
                setOtros(res.data.filter(e => e.type === "otro"))
            })
            .catch(err => {
                console.log(err)
                limpiarTodos(err.response);
            })
    }, [navegar])

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
            <Carroucel title="Hamburguesas" productos={comida} actionToast={actionToast} />
            <Carroucel title="Bebidas" productos={bebida} actionToast={actionToast} />
            <Carroucel title="Postres" productos={postre} actionToast={actionToast} />
            <Carroucel title="Otros" productos={otros} actionToast={actionToast} />
        </>
    )
}

export default Products