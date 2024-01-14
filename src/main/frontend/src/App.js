// src/main/frontend/src/App.js

import React from "react";
import "./normalization.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ClientSignup from "./pages/ClientSignup";
import DesignerSignup from "./pages/DesignerSignup";
import axios from "axios";

function App() {

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signup/client" element={<ClientSignup />} />
				<Route path="/signup/designer" element={<DesignerSignup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
