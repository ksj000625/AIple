import React from "react";
import { BrowserRouter as Router, Route, Link, useRouteMatch, Routes, useParams } from "react-router-dom";
import CategoryPage from "./CategoryPages"

export default function Main() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<CategoryPage/>} />
                <Route path=":categoryName" element={<CategoryPage/>}/>                
            </Routes>      
        </div>
    )
}