import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"
import Header from "./Header";
import Footer from "./Footer";

const Layout=()=>{
    return(
        <div className="layout">
            <Header />

            <main>
                <h2>Layout death</h2>
            </main>

            <Footer />
        </div>
    )
}

export default Layout