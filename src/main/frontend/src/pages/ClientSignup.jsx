import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';

export default function ClientSignup() {
    return (

        <div className="ClientSignup">
            {/* <header>header</header> */}
            <div className="main">
                <div className="inner">
                    <div className="main-col-container">
                        <div className="center-title-container">
                            <div className="title">고객 회원가입</div>
                            <div className="desc">AI의 힘을 경험하세요. 지금 바로 가입 하고, 당신만의 디자인을 의뢰하세요.</div>
                        </div>
                        <div className="form-container">
                            <fieldset>
                                <div className="form-title-container">
                                    <div className="title">기본 회원 정보</div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="email">이메일</label>
                                            <FontAwesomeIcon
                                                icon={faStarOfLife}
                                                size="2xs"
                                                style={{
                                                    color: "#fe3939"
                                                }}/>
                                        </div>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="이메일 입력"/>                                          
                                        <div className="error-message-wrap"></div>
                                    </div>
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="new-password">비밀번호</label>
                                            <FontAwesomeIcon
                                                icon={faStarOfLife}
                                                size="2xs"
                                                style={{
                                                    color: "#fe3939"
                                                }}/>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="8자 이상 20자 이내 영문/숫자 포함"/>                                         
                                        <div className="error-message-wrap">                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="nickname">닉네임</label>
                                            <FontAwesomeIcon
                                                icon={faStarOfLife}
                                                size="2xs"
                                                style={{
                                                    color: "#fe3939"
                                                }}/>
                                        </div>
                                        <input
                                            type="text"
                                            id="nickname"
                                            name="nickname"
                                            placeholder="ex.에이플"/>                                            
                                    </div>
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="profile">프로필 이미지 등록</label>
                                        </div>
                                        <div className="profile-container">
                                            <div className="profile-image"></div>
                                            <input
                                                type="file"
                                                accept="image/*"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="submit-button-container">
                                <button className="submit-button">가입 완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}