import CardProduct from "./CardProduct";
import './Carroucel.css'

const Carroucel = (props) => {
    const { title, productos } = props;
    const { actionToast } = props;

    // Cantidad de cards que queremos mostrar por carroucel
    const numCardsForCarroucel = 4;

    // Hacemos un redondeo hacia arriba para saber cuantos carrouceles necesitamos
    if(productos.length > 0) {
        const numCarroucelView = Math.ceil(productos.length / numCardsForCarroucel);
        return (        
            <div className="container-xl">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="encabezadoCarroucel">{title}</h2>
                        <div id={`myCarousel${title}`} className="carousel slide" data-ride="carousel" data-interval="0">
                            {/* <!-- Indicadores del carroucel --> */}
                            <ol className="carousel-indicators">
                                {/* Hacemos un ciclo hasta numCarroucelView */}
                                {Array.from(Array(numCarroucelView).keys()).map((index) => {
                                    return (
                                        <li data-target={`#myCarousel${title}`} key={index} data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                                    );
                                })
                                }
                            </ol>
                            {/* <!-- Contenedor del carroucel --> */}
                            <div className="carousel-inner">
                                <div className="item carousel-item active">
                                    {/* Insertamos un row con cards de productos cada numCardsForCarroucel  */}
                                    <div className="row">
                                        {productos.slice(0, numCardsForCarroucel).map((producto) => {
                                            return (
                                                <CardProduct key={producto.name} name={producto.name} price={producto.price} urlImg={producto.urlImg} actionToast={actionToast}  />
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Hacemos un ciclo de  */}
                                {Array.from(Array(numCarroucelView - 1).keys()).map((index) => {
                                    return (
                                        <div className="item carousel-item" key={index}>
                                            <div className="row">
                                                {productos.slice((index + 1) * numCardsForCarroucel, (index + 2) * numCardsForCarroucel).map((producto) => {
                                                    return (
                                                        <CardProduct key={producto.name} name={producto.name} price={producto.price} urlImg={producto.urlImg} actionToast={actionToast}  />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                            <a className="carousel-control-prev" href={`#myCarousel${title}`} data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="carousel-control-next" href={`#myCarousel${title}`} data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <h2 className="encabezadoCarroucel">{title}</h2>
            <p style={{color: 'white', textAlign: "center"}}>No hay {title} disponibles para mostrar😢</p>
        </>
    )

}

export default Carroucel