const CardDashboard = ({ data }) => {
    return (
        <div className="card" style={{width:"20rem"}}>
            <img src={data.img} className="card-img-top" alt={data.title} />
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button href="#" className="btn btn-primary">Go somewhere</button>
                </div>
        </div>
    )
}

export default CardDashboard