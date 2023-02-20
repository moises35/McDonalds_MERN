import React, { useState, useEffect} from 'react'
import { isAuthorized } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [user, setUser] = useState('')
    const navegar = useNavigate()

    useEffect(() => {
        if(!isAuthorized()) {
            navegar('/')
        }
        obtenerData()
    }, [navegar])

    const obtenerData = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            setUser(user)
        }
        user = '';
    }
    
    return (
        <>
            <>
                <h2 className="encabezadoCarroucel">Bienvenido {user !== ''? `${user.firstName} ${user.lastName}` : ''}👋🏻</h2>
            </>
        </>
    )
}

export default Dashboard