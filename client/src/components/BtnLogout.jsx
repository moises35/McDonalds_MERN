import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const Btn = styled.button`
    background-color: #c12312;
    color: white;
    border-radius: 16px;
    width: 138px;
    padding: 8px 0;
    margin: 0 16px;
    font-size: 1rem;
    cursor: pointer;
    border: 3px solid white;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
        background-color: #d73b2a;
        color: white;
    }
`

const BtnLogout = () => {
    const navegar = useNavigate();

    const logoutUser = () => {
        axios.get('/user/logout')
        .then(res => {
            console.log(res)
            localStorage.clear();
            navegar('/');
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Btn onClick={logoutUser}>Logout</Btn>
    )
}

export default BtnLogout