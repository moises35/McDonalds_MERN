import styled from "styled-components";

const Notification = styled.div`
    width: 300px;
    height: 55px;
    border-radius: 5px;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #ffffff;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: row-reverse;

    i {
        margin: 0 0.5rem 0 0;
    }
`

const Toast = ({ text, tipo }) => {
    let clase2 = "";
    switch (tipo) {
        case "info":
            clase2 = "fa fa-info";
            break;
        case "success":
            clase2 = "fa fa-check";
            break;
        case "error":
            clase2 = "fa fa-exclamation-circle";
            break;
        case "warning":
            clase2 += " fa-exclamation-triangle";
            break;
        default:
            break;
    }

    return (
        <Notification className={tipo}>
            <span className="wish-icon"><i className={clase2}></i>{text}</span>
        </Notification>
    )
}

export default Toast