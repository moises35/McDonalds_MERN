import Footer from "../components/Footer"
import Header from "../components/Header"
import styled from "styled-components"
import landing from "../assets/landing.svg"
import { useNavigate } from "react-router-dom"
import { isAuthorized } from "../utils/auth"

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #DE2612;
`

const Img = styled.img`
    height: 400px;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #FCBA1E;
    font-size: 2.1rem;
    font-weight: bold;
    width: 30%;
    margin: 3rem 0;
`

const Btn = styled.button`
    display: block;
    margin: 0 auto;
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

const Home = () => {
    const navegar = useNavigate();
    const pressBtn = () => {
        isAuthorized() ? navegar("/dashboard") : navegar("/login");
    }

    const buttons = [
        {url: "/login", text: "Login"},
        {url: "/signup", text: "Sign up"}
    ]

    return (
        <>
            <Header buttons={buttons} /> 
            <Main>
                <TextContainer>                    
                    <p>Welcome to McDonald's. Register or log in to take your order</p>
                    <Btn onClick={pressBtn}>Order now</Btn>
                </TextContainer>
                <div>
                    <Img src={landing} alt="landing" />
                </div>
            </Main>
            <Footer />
        </>
    )
}

export default Home