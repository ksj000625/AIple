import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';

export default function DesignerSignup() {
   
    return (
        <div className="designerSignup">
            {/* <header>header</header> */}
            <div className="main">
                <div className="inner">
                    <div className="main-col-container">
                        <div className="center-title-container">
                            <div className="title">디자이너 가입</div>
                            <div className="desc">지금 바로 작가로 등록하고, 창작의 세계를 넓혀보세요.</div>
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
                                        <div className="error-message-wrap">                                           
                                        </div>
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
                                        <div className="error-message-wrap"></div>
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
                            <fieldset>
                                <div className="form-title-container">
                                    <div className="title">디자이너 정보</div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="business-email">업무용 이메일</label>
                                        </div>
                                        <div className="email-form">
                                            <input
                                                type="text"
                                                id="business-email-id"
                                                name="business-email-id"
                                                placeholder="이메일 입력"/>
                                            @
                                            <input type="text" id="business-email-domain" name="business-email-domain"/>
                                            <select id="domain-select" name="domain-select">
                                                <option value="">직접입력</option>
                                                <option value="gmail.com">gmail.com</option>
                                                <option value="naver.com">naver.com</option>
                                                <option value="daum.net">daum.net</option>
                                            </select>
                                        </div>
                                        <div className="desc min">로그인 시 사용하는 이메일이 아닌 업무용 이메일을 등록해주세요.</div>
                                    </div>
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="phone">휴대폰 번호</label>
                                        </div>
                                        <input type="tel" id="phone" name="phone" placeholder="- 없이 한 번에 입력"/></div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="name">이름</label>
                                        </div>
                                        <input type="text" id="name" name="name" placeholder="ex.김에플"/>
                                    </div>
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="team">소속</label>
                                        </div>
                                        <input type="text" id="team" name="tean" placeholder="팀 또는 회사명"/>
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