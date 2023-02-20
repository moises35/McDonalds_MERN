import { useEffect } from 'react'
import { isAuthorized } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const navegar = useNavigate()

    useEffect(() => {
        if(!isAuthorized()) {
            navegar('/')
        }
    }, [navegar])
    
    return (
        <div>Orders</div>
    )
}

export default Orders