import { useNavigate } from "react-router-dom"

const CardDashboard = ({ data }) => {
    let img = {
        width: "70%",
        margin: "8px auto 0"
    }

    let center = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }   

    const navegar = useNavigate();

    const redirigir = () => {
        navegar(data.link)
    } 

    return (
        <div className="card" style={{ width: "17rem", height:"20rem" }}>
            <img src={data.img} className="card-img-top" style={img} alt={data.title} />
            <div className="card-body" style={center}>
                <h5 className="card-title">{data.title}</h5>
                <button onClick={redirigir} className="btn btn-primary ">Ir a {data.title}</button>
            </div>
        </div>
    )
}

export default CardDashboard