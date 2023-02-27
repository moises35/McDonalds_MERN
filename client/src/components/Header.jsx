import { Link } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'
import logo from './../assets/logo.png'
import BtnHead from './BtnHead'
import BtnLogout from './BtnLogout'
import "./Nav.css"

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

const Header = ({ buttons, logout, pressBtn }) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <Cabecera>
            <Link to={"/"} style={{ height: '100%' }}>
                <Img src={logo} alt="logo" />
            </Link>
            <button className="hamburger" onClick={() => { setIsNavExpanded(!isNavExpanded) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"} id="nav">
                {buttons.map((button, index) => {
                    return <BtnHead key={index} text={button.text} url={button.url} />
                })
                }
                {logout ? <BtnLogout pressBtn={pressBtn} /> : null}
            </div>
        </Cabecera>
    )
}

export default Header