import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./views/Home";
import LoginSignUp from "./views/LoginSignUp";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import Orders from "./views/Orders";
import RoutePrivate from "./views/RoutePrivate";
import MiCuenta from "./views/MiCuenta";
import Favoritos from "./views/Favoritos";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes> 
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginSignUp comp={"login"} />} />
					<Route path="/signup" element={<LoginSignUp comp={"signUp"} />}  />
					<Route element={<RoutePrivate />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/productos" element={<Products />} />
						<Route path="/pedidos" element={<Orders />} />
						<Route path="/myAccount" element={<MiCuenta />} />
						<Route path="/favoritos" element={<Favoritos />} />
					</Route>
					<Route path="*" element={<Navigate to='/login' replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
