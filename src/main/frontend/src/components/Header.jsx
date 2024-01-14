import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link className="logo" to='/'>
                        Home
                    </Link>
                </div>
                <ul>
                    <li>
                        <Link className="header-nav-item" to="/signup">
                            가입
                        </Link>
                    </li>
                    <li>
                        <Link className="header-nav-item" to="/signup/client">
                            고객 가입
                        </Link>
                    </li>
                    <li>
                        <Link className="header-nav-item" to="/signup/designer">
                            디자이너 가입
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}