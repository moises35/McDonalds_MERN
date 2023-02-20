import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

const RoutePrivate = () => {
    const buttons = [
        {url: "/dashboard", text: "Dashboard"},
        {url: "/productos", text: "Productos"},
        {url: "/pedidos", text: "Pedidos"},
    ]
    return (
        <>
            <Header buttons={buttons} logout={true}  />
            <Footer />
            <Outlet />
        </>
    )
}

export default RoutePrivate