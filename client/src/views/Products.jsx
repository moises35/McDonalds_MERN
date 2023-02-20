import Carroucel from "../components/Carroucel"
import { useEffect, useState } from "react"
import axios from "axios"
import { isAuthorized } from "../utils/auth"
import { useNavigate } from "react-router-dom"

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
            })
    }, [navegar])

    return (
        <>
            <Carroucel title="Hamburguesas" productos={comida} />
            <Carroucel title="Bebidas" productos={bebida} />
            <Carroucel title="Postres" productos={postre} />
            <Carroucel title="Otros" productos={otros} />
        </>
    )
}

export default Products