import React from "react";
import {Link} from "react-router-dom";
import "../styles/CategoryBar.css";

export default function CategoryBar() {
    return (
        <div className="category-bar">
            <div className="thick-line"></div>
            <nav className="category-container">
                <ul>
                    <li className="category">
                        <Link to="/main">전체</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/웹앱">웹/앱</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/일러스트">일러스트</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/인쇄물">인쇄물</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/PPT">PPT</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/제품">제품</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/로고">로고</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/썸네일">썸네일</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/3D모델링">3D모델링</Link>
                    </li>
                    <li className="category">
                        <Link to="/main/기타">기타</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
