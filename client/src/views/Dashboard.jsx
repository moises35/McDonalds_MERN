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
        { title: 'Favoritos', description: 'Puede agregar favoritos', img: 'https://pbs.twimg.com/media/Bph3ltvCQAMn5oi.jpg' },
        { title: '', description: '', img: '' },
        { title: '', description: '', img: '' },
    ]

    return (
        <>
            <>
                <h2 className="encabezadoCarroucel">Bienvenido {user !== '' ? `${user.firstName} ${user.lastName}` : ''}👋🏻</h2>
                <div className="row">
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