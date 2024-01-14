import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';

export default function ClientSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [nicknameValid, setNicknameValid] = useState(false);

    const [notAllow, setNotAllow] = useState(true);

    const inputRef = useRef(null);

    /**이메일  유효성 검사*/
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };
    /**비밀번호  유효성 검사*/
    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
        if (regex.test(password)) {
            setPasswordValid(password);
            setPasswordValid(true);
        } else {
            setPasswordValid(password);
            setPasswordValid(false);
        }
    };

    const handleNickname = (e) => {
        setNickname(e.target.value);
        const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
        if (regex.test(nickname)) {
            setNicknameValid(true);
        } else {
            setNicknameValid(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e
            .target
            .files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setProfileImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleProfileClick = () => {
        inputRef
            .current
            .click();
    };

    /**이메일,패스워드 유효 -> 가입완료 버튼 활성화 */
    useEffect(() => {
        if (emailValid && passwordValid && nicknameValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, passwordValid, nicknameValid]);

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
                                            placeholder="이메일 입력"
                                            value={email}
                                            onChange={handleEmail}/>
                                        <div className="error-message-wrap">
                                            {!emailValid && email.length > 0 && (<div>올바른 이메일을 입력해주세요.</div>)}
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
                                            placeholder="8자 이상 20자 이내 영문/숫자 포함"
                                            value={password}
                                            onChange={handlePassword}/>
                                        <div className="error-message-wrap">
                                            {
                                                !passwordValid && password.length > 0 && (
                                                    <div>영문, 숫자 포함 8자 이상 20자 이내로 입력해주세요.</div>
                                                )
                                            }
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
                                            placeholder="ex.에이플"
                                            value={nickname}
                                            onChange={handleNickname}/>
                                    </div>
                                    <div class="form-group">
                                        <div className="form-label-container">
                                            <label for="profile">프로필 이미지 등록</label>
                                        </div>
                                        <div className="profile-container">
                                            <div className="profile-image" onClick={handleProfileClick}>
                                                {
                                                    profileImage
                                                        ? (
                                                            <img
                                                                src={profileImage}
                                                                alt="프로필 이미지"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '50%'
                                                                }}/>
                                                        )
                                                        : <img src={process.env.PUBLIC_URL + "/user-solid.svg"}/>
                                                }
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={inputRef}
                                                onChange={handleImageUpload}
                                                style={{
                                                    display: 'none'
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="submit-button-container">
                                <button disabled={notAllow} className="submit-button">가입 완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}