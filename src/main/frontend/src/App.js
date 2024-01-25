// src/main/frontend/src/App.js

import React from "react";
import "./normalization.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ClientSignup from "./pages/ClientSignup";
import DesignerSignup from "./pages/DesignerSignup";
import Header from "./components/Header";
import Category from "./components/Category";
import Footer from "./components/Footer";

function App() {

	return (
		<BrowserRouter>
			<Header />
			{/*<Searchbar/>*/}
			<Category />
			<div className="wrap-container">
				<div className="main-container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/signup/client" element={<ClientSignup />} />
						<Route path="/signup/designer" element={<DesignerSignup />} />
					</Routes>
				</div>
			</div>
			<footer>
			</footer>
		</BrowserRouter>
	);
}


export default App;
