import React from "react";
import { Link } from "react-router-dom";
import "../styles/ImgButton.css"

export default function Signup() {
    return (
        <div className="signup">
            <div className="main">
                    <div className="main-container">
                        <div className="title-container">
                            <div className="title">AIple 회원가입</div>
                            <div className="desc">
                                유니크하고 합리적인 디자인과 아이디어를 원한다면 <br/>
                                AI 디자이너 플랫폼, AIple
                            </div>
                        </div>
                        <div className="img-button-container">
                            <Link className="img-button" to="/signup/designer">
                                <div className="img-button-title">디자이너 가입</div>
                                <img src={process.env.PUBLIC_URL + "/Painting.png"}/>
                            </Link>
                            <Link className="img-button" to="/signup/client">
                                <div className="img-button-title">고객 가입</div>
                                <img src={process.env.PUBLIC_URL + "/Coder.png"}/>
                            </Link>
                            <div className="login-button-container">
                                <div className="desc">이미 가입하셨다면</div>
                                <button className="login-button button">로그인</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}