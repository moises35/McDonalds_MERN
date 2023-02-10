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

const Header = ({buttons}) => {
    return (
        <Cabecera>
            <Link to={"/"} style={{height: '100%'}}> 
                <Img src={logo} alt="logo" />
            </Link>
            <div>
                {buttons.map((button, index) => {
                    return <BtnHead key={index} text={button.text} url={button.url} />
                })
                }
            </div>
        </Cabecera>
    )
}

export default Header