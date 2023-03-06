import styled from "styled-components"
import logo from './../assets/logoCircle.svg'
import axios from 'axios'
import { useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const Select = styled.select`
    display: block;
    width: 100%;
    height: 37px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const Label = styled.label`
    color: white;
    font-weight: bold;
`

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

const MiCuenta = () => {
    const [selected, setSelected] = useState('firstName')
    const [value, setValue] = useState('')
    const navegar = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://mcdonaldsnode.onrender.com/user/update', { type: selected, value: value }, { withCredentials: true })
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navegar('/login')
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
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
                    <Label htmlFor="floatingInput">Field to Edit</Label>
                    <Select name="modify" id="modify" onChange={(e) => setSelected(e.target.value)} defaultValue={selected}>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="userName">User Name</option>
                        <option value="password">Password</option>
                    </Select>
                </div>
                <div className="form-floating">
                    <Label htmlFor="floatingText">Value</Label>
                    <input required type="text" className="form-control" id="floatingText" placeholder="Value" onChange={(e) => setValue(e.target.value)} value={value} />
                </div>
                <Btn type="submit">Update</Btn>
            </Form>
        </Container>
    )
}

export default MiCuenta