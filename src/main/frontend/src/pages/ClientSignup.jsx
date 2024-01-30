import React, {useState, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import "../styles/Form.css";
import axios from "axios";
import {auth} from "../auth/firebaseAuth";
import {defaultHeaders} from "../config/clientConfig";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default function ClientSignup() {
    const [profileImage, setProfileImage] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            if(firebaseUser) {
                const token = await firebaseUser.getIdToken();
                defaultHeaders.Authorization = `Bearer ${token}`;

                const res = await fetch("/api/users/me", {
                    method: "GET",
                    headers: defaultHeaders
                });
                if(res.status === 200) {
                    const user = await res.json();
                    console.log(`user: ${user}`);
                    setUser(user);
                } else if (res.status === 401) {
                    const data = await res.json();
                    console.log(`400 Error: ${data}`);
                }
            } else {
                delete defaultHeaders.Authorization;
            }
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
            isSubmitted,
            errors,
            isValid
        }
    } = useForm({mode: "onChange"});

    const inputRef = useRef(null);

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

    async function login(email, password) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    async function handleUploadProfileImage() {
        console.log(defaultHeaders.Authorization);

        await axios
            .post("/api/users/me/profileImage",
                profileImage,
                {
                    headers: {
                        Authorization: defaultHeaders.Authorization
                    }
                }
            )
            .then(res => console.log(JSON.stringify(res)))
            .catch(err => console.log(err));
    }

    return (<div className="ClientSignup">
        <div className="main">
            <div className="inner">
                <div className="main-col-container">
                    <div className="center-title-container">
                        <div className="title">고객 회원가입</div>
                        <div className="desc">
                            AI의 힘을 경험하세요. 지금 바로 가입 하고, 당신만의 디자인을 의뢰하세요.
                        </div>
                    </div>
                    <div className="form-container">
                        <form
                            onSubmit={handleSubmit(async (data) => {
                                // await new Promise((r) => setTimeout(r, 1000));
                                alert(JSON.stringify(data));

                                await axios
                                    .post("/api/users/signUpEmail/Client",
                                        data
                                    )
                                    .then(() => console.log(data))
                                    .catch(err => {
                                        console.log(err);
                                    });
                                await login(data.email, data.password);
                                await handleUploadProfileImage();
                            })}>
                            <div className="form-title-container">
                                <div className="title">기본 회원 정보</div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <div className="form-label-container">
                                        <label>이메일</label>
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
                                        aria-invalid={isSubmitted
                                            ? errors.email
                                                ? "true"
                                                : "false"
                                            : undefined}
                                        {...register("email", {
												required: "이메일을 입력해주세요.",
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: "이메일 형식에 맞지 않습니다.",
												},
											})}/>{" "}
                                    {
                                        errors.email && (
                                            <small className="error-message" role="alert">
                                                {errors.email.message}
                                            </small>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="form-label-container">
                                        <label>비밀번호</label>
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
                                        aria-invalid={isSubmitted
                                            ? errors.password
                                                ? "true"
                                                : "false"
                                            : undefined}
                                        {...register("password", {
												required: "비밀번호를 입력해주세요.",
												minLength: {
													value: 8,
													message: "8자리 이상 입력해주세요.",
												},
											})}/>{" "}
                                    {
                                        errors.password && (
                                            <small className="error-message" role="alert">
                                                {errors.password.message}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <div className="form-label-container">
                                        <label>닉네임</label>
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
                                        aria-invalid={isSubmitted
                                            ? errors.nickname
                                                ? "true"
                                                : "false"
                                            : undefined}
                                        {...register("nickname", {
                                            required: "닉네임을 입력해주세요.",
                                            minLength: {
                                            value: 2,
                                            message: "두 자리 이상 입력해주세요.",
                                            },
                                        })}/>{" "}
                                    {errors.nickname && (<small role="alert">{errors.nickname.message}</small>)}
                                </div>
                                <div className="form-group">
                                    <div className="form-label-container">
                                        <label>프로필 이미지 등록</label>
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
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                borderRadius: "50%"
                                                            }}/>
                                                    )
                                                    : (<img alt="profileImage" src={process.env.PUBLIC_URL + "/user-solid.svg"}/>)
                                            }
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={inputRef}
                                            onChange={handleImageUpload}
                                            style={{
                                                display: "none"
                                            }}/>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-button-container">
                                <button
                                    type="submit"
                                    disabled={isSubmitting && !isValid}
                                    className="submit-button"
                                    style={{
                                        backgroundColor: isValid
                                            ? "#8220FF"
                                            : "#CFCFCF"
                                    }}>
                                    가입 완료
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}