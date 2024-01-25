import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"
import "../App.css"

const Header=()=>{
    return(
        <header className="header">
            <div className="content">
                <div>
                    로고 자리
                </div>

                <nav className="navigation">
                    <ul>
                        <li>
                            알림
                        </li>
                        <li className="login">
                            로그인
                        </li>
                        <li>
                            회원가입
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export  default Header