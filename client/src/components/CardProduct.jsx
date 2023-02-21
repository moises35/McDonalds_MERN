import "./Carroucel.css"
import axios from "axios";

const CardProduct = (props) => {
    const { name, price, urlImg } = props;
    const { actionToast } = props;

    const favorito = (e) => {
        e.target.classList.toggle("fa-heart-o");
        e.target.classList.toggle("fa-heart");
        e.target.classList.toggle("red");
        if (e.target.classList.contains("red")) {
            actionToast("success", `${name} agregado a favoritos`);
        } else {
            actionToast("info", `${name} eliminado de favoritos`);
        }
    }

    const agregarCarrito = () => {
        const dataToSend = {
            name,
            price
        }
        axios.put("/user/pedidos/add", dataToSend)
            .then(res => {
                console.log(res);
                actionToast("success", `🛒${name} agregado a pedidos`);
            })
            .catch(err => {
                console.log(err);
                actionToast("error", `😢${name} no se pudo agregar a pedidos`);
            })
    }

    return (
        <div className="col-sm-3">
            <div className="thumb-wrapper">
                <span className="wish-icon"><i onClick={favorito} className="fa fa-heart-o"  ></i></span>
                <div className="img-box">
                    <img src={urlImg} className="img-fluid" alt={name} />
                </div>
                <div className="thumb-content">
                    <h4>{name}</h4>
                    <p className="item-price"><b>${price}</b></p>
                    <button className="btn btn-primary" onClick={agregarCarrito}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardProduct