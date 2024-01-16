import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "../styles/Banner.css"
import {Link} from "react-router-dom";
export default function Home() {
    return (
        <div className="Home">
            <div className="main">
                <div className="banner">
                    <div className="inner">
                        <div className="main-container">
                            <div className="banner-title-container">
                                <div className="title">디자인을 AI와 함께 완성하다</div>
                                <div className="banner-logo">AIple</div>
                                <div className="desc">
                                    AIple은 디자인의 창의성과 효율성을 높이며,<br/>
                                    디자이너의 역량에 AI를 결합하여 품질 높은 디자인 작업을 완성합니다.<br/>
                                    AIple과 함께 디자인을 의뢰 해보세요.
                                </div>
                                <div className="button">
                                    <Link className="button-title-container" to="/main">
                                        <p>살펴보기</p>
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            style={{
                                                color: "#fff"
                                            }}/>
                                    </Link>
                                </div>
                            </div>
                            <div className="img-container">
                                <img
                                    className="banner-img"
                                    src={process.env.PUBLIC_URL + "/ui-design-monochromatic.png"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner">
                    <Link className="banner-button" to="/signup/designer">
                        <div className="title">수익을 원하는 전문가라면? 지금 바로 디자이너 등록</div>
                        <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} size="xl"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}