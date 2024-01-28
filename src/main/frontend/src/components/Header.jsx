import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"
import "../App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";

export default function Header(){
    const [showsNotice, setShowNotice] = useState(false);
    const detectingAlarmRef = useRef(null);

    useEffect(() => {
        const handleDetect = (
            e: React.BaseSyntheticEvent | MouseEvent) =>{
            if(
                detectingAlarmRef.current &&
                !detectingAlarmRef.current.contains(e.target)
            ){
                setShowNotice(false);
            }
        };
        document.addEventListener('mousedown', handleDetect);
        return()=>{
            document.removeEventListener('mousedown', handleDetect);
        };
    }, []);

    return(
        <header className="header">
            <div className="content">
                <div>
                    <Link to="/Home">
                        로고 자리
                    </Link>
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <ul className="Bell" onClick={() => setShowNotice(true)}>
                                <FontAwesomeIcon icon={faBell} color="gold"/>
                                {showsNotice &&(
                                    <ul
                                        ref={detectingAlarmRef}
                                        className="BellWindow">
                                            <h5>알림 창</h5>
                                    </ul>
                                )}
                            </ul>
                        </li>
                        <li className="login">
                            로그인
                        </li>
                        <li className="signup">
                            <Link to="/Signup">
                                회원가입
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}