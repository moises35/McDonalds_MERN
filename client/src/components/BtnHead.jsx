import { useNavigate } from "react-router-dom"
import styled from "styled-components"
const BtnHead = ({url, text}) => {
    const Btn = styled.button`
        background-color: #FCBA1E;
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
            background-color: #FCAE1E;
            color: white;
        }
    `

    const navigate = useNavigate();
    const controllerBtn = () => {
        navigate(url);
    }

    return (
        <Btn onClick={controllerBtn}>{text}</Btn>
    )
}

export default BtnHead