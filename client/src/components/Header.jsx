import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './../assets/logo.png'
import BtnHead from './BtnHead'

const Cabecera = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #DE2612;
    height: 96px;
    width: 100%;
    padding: 10px 64px;
    border-bottom: 3px solid #FCBA1E;
`

const Img = styled.img`
    height: 100%;  
`

const Header = () => {
    return (
        <Cabecera>
            <Link to={"/"} style={{height: '100%'}}> 
                <Img src={logo} alt="logo" />
            </Link>
            <div>
                <BtnHead text={"LOGIN"} url={"/login"} />
                <BtnHead text={"SIGN UP"} url={"/signup"} />
            </div>
        </Cabecera>
    )
}

export default Header