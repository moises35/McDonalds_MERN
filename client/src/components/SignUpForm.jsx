import styled from "styled-components"
import logo from './../assets/logoCircle.svg'
import axios from 'axios'
import { useState } from "react"
import Swal from 'sweetalert2'

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
        margin: 0.5rem auto 0;
    }

    .form-control:focus {
        border-color: #FCBA1E;
        box-shadow: 0 0 0 0.25rem #FCBA1E;
    }   
`

const Btn = styled.button`
    display: block;
    margin:1.3rem auto;
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

const SignUpForm = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const config = { headers: { 'Content-Type': 'application/json' } }
        axios.post('/user/create', data, config)
            .then(res => {
                // Seteamos los datos del usuario
                setData({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    password: ''
                })
                console.log(res)
                Swal.fire({
                    title: 'Success!',
                    text: `User created successfully`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
                let errors = ''
                for (let key in err.response.data.errors) {
                    errors += `${err.response.data.errors[key].message}. `
                }
                Swal.fire({
                    title: 'Error!',
                    text: `${errors}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }

    return (
        <Container>
            <img src={logo} alt="McDonalds Logo" />
            <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    {/* Input con un evento para cambiar el estado */}
                    <input type="text" className="form-control" id="floatingInput" placeholder="Juan" onChange={(e) => setData({...data, firstName: e.target.value})} value={data.firstName}  />
                    <label htmlFor="floatingInput">First Name</label>
                    {/* <div class="valid-feedback">Looks good!</div> */}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput2" placeholder="Perez" onChange={(e) => setData({...data, lastName: e.target.value})} value={data.lastName} />
                    <label htmlFor="floatingInput2">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput3" placeholder="juan.perez19" onChange={(e) => setData({...data, userName: e.target.value})} value={data.userName} />
                    <label htmlFor="floatingInput3">User Name</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="on" onChange={(e) => setData({...data, password: e.target.value})} value={data.password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <Btn type="submit" >Sign Up</Btn>
            </Form>
        </Container>
    )
}

export default SignUpForm