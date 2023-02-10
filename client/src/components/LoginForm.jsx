import styled from "styled-components"
import logo from './../assets/logoCircle.svg'
import axios from 'axios'
import { useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width:300px;
    margin: 0 auto;

    img {
        margin: 1.5rem 0 1rem 0;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0 auto;

    label {
        background-color: transparent;
        border: none;
        font-weight: bold;
    }

    div.form-floating {
        width: 95%;
        margin: 0.8rem auto 0;
    }

    .form-control:focus {
        border-color: #FCBA1E;
        box-shadow: 0 0 0 0.25rem #FCBA1E;
    }   
`

const Btn = styled.button`
    display: block;
    margin:2rem auto;
    background-color: #F53627;
    color: white;
    border-radius: 20px;
    border: 3px solid white;
    width: 170px;
    font-size: 1rem;
    font-weight: bold;
    padding: 6px 5px;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: #FCBA1E;
    }
`

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navegar = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/user/login', { userName: username, password })
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.response.data.message}`,
                })
            })
    }

    return (
        <Container>
            <img src={logo} alt="McDonalds Logo" />
            <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input required type="text" className="form-control" id="floatingInput" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <label htmlFor="floatingInput">User Name</label>
                </div>
                <div className="form-floating">
                    <input required type="password" className="form-control" id="floatingPassword" autoComplete="on" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <Btn type="submit">Login</Btn>
            </Form>
        </Container>
    )
}

export default LoginForm