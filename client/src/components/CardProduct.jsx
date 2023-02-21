import "./Carroucel.css"

const CardProduct = (props) => {
    const {name, price, urlImg} = props;
    const {addToast} = props;

    const favorito = (e) => {
        e.target.classList.toggle("fa-heart-o");
        e.target.classList.toggle("fa-heart");
        e.target.classList.toggle("red");
        if(e.target.classList.contains("red")) {
            addToast(name + " se ha agregado a favoritos", "success");
        } else {
            addToast(name + " se ha quitado de favoritos", "info");
        }
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
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardProduct