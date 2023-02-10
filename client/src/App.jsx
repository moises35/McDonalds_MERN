import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import LoginSignUp from "./views/LoginSignUp";
import Dashboard from "./views/Dashboard";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes> 
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginSignUp comp={"login"} />} />
					<Route path="/signup" element={<LoginSignUp comp={"signUp"} />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
