// src/main/frontend/src/App.js

import React from "react";
import "./normalization.css";
import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/signup/Signup";
import ClientSignup from "./pages/signup/ClientSignup";
import DesignerSignup from "./pages/signup/DesignerSignup";
import Main from "./pages/main/Main";
import Detail from "./pages/Detail";
import CategoryBar from "./components/CategoryBar";


function MainRoutes() {
    return (
        <div>
            <CategoryBar/>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/:categoryName" element={<Main />}/>
                <Route path="/detail/:id" element={<Detail />}/>
            </Routes>
        </div>
    );
}

function App() {
    // const { user } = useContext(UserContext);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/signup/client" element={<ClientSignup />}/>
                <Route path="/signup/designer" element={<DesignerSignup />}/>
                <Route path="/main/*" element={<MainRoutes/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
