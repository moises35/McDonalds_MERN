import Carroucel from "../components/Carroucel"
import { useEffect, useState } from "react"
import axios from "axios"
import { isAuthorized } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import Toast from "../components/Toast"
import styled from "styled-components"

const Toasts = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    span {
        color: #ffffff;
        margin: 0 20px 0 0;
        font-size: 1rem;
    }

`

const Products = () => {
    const [comida, setComida] = useState([])
    const [bebida, setBebida] = useState([])
    const [postre, setPostre] = useState([])
    const [otros, setOtros] = useState([])
    const [contentToasts, setContentToasts] = useState([]);
    const navegar = useNavigate()
    
    function generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3)).toString(16);
        });
        return uuid;
    }

    const addToast = (text, type) => {
        // Generar un ID único para cada toast
        let id = generateUUID();
        // Crear el contenido del toast
        let content = {
            id: id,
            text: text,
            tipo: type
        };
        setContentToasts([...contentToasts, content]);
        // Eliminar el toast después de 3 segundos
        setTimeout(() => {
            removeToast(id);
        }, 2000);
    }

    const removeToast = (id) => {
        setContentToasts(contentToasts.filter((content) => content.id !== id));
    };

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
            })
    }, [navegar])

    return (
        <>
            <Toasts id="toasts">
                {contentToasts.map((content) => (
                    <Toast key={content.id} tipo={content.tipo} text={content.text} />
                ))}
            </Toasts>
            <Carroucel title="Hamburguesas" productos={comida} addToast={addToast} />
            <Carroucel title="Bebidas" productos={bebida} addToast={addToast} />
            <Carroucel title="Postres" productos={postre} addToast={addToast} />
            <Carroucel title="Otros" productos={otros} addToast={addToast} />
        </>
    )
}

export default Products