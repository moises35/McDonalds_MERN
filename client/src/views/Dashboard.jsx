import React, { useState, useEffect } from 'react'
import { isAuthorized } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import CardDashboard from '../components/CardDashboard'

const Dashboard = () => {
    const [user, setUser] = useState('')
    const navegar = useNavigate()

    useEffect(() => {
        if (!isAuthorized()) {
            navegar('/')
        }
        obtenerData()
    }, [navegar])

    const obtenerData = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
        user = '';
    }

    const datos = [
        { title: 'Favoritos', link:'/favoritos' ,img: 'https://st2.depositphotos.com/47577860/46274/v/450/depositphotos_462742636-stock-illustration-favorite-heart-icon-solid-style.jpg' },
        { title: 'Pedidos', link:'/pedidos' ,img: 'https://cdn-icons-png.flaticon.com/512/1532/1532688.png' },
        { title: 'Mi Cuenta', link:'/myAccount' ,img: 'https://media.istockphoto.com/id/954703070/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/gear-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%BC%D1%83%D0%B6%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D0%BB%D0%B8%D1%86%D0%BE-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BD%D0%B0-cog-%D0%BA%D0%BE%D0%BB%D0%B5%D1%81%D0%BE-%D0%B4%D0%BB%D1%8F.jpg?s=170667a&w=0&k=20&c=lJl-wpjacf-X6LVDQgm4j6htiMd4tYOc5hnyY0yBWKI=' }
    ]

    const flexbox = {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 auto 2rem",
    }

    return (
        <>
            <>
                <h2 className="encabezadoCarroucel">Bienvenido {user !== '' ? `${user.firstName} ${user.lastName}` : ''}👋🏻</h2>
                <div className="row" style={flexbox}>
                    {datos.map((item, index) => {
                        return (
                            <CardDashboard key={item.title} data={item} />
                        )
                    })}
                </div>
            </>
        </>
    )
}

export default Dashboard