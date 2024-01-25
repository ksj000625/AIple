import React, {useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import "../styles/Form.css";
import axios from "axios";

export default function DesignerSignup() {
    const [profileImage, setProfileImage] = useState(null);

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
    return (
        <div className="designerSignup">
            <div className="main">
                <div className="inner">
                    <div className="main-col-container">
                        <div className="center-title-container">
                            <div className="title">디자이너 가입</div>
                            <div className="desc">지금 바로 작가로 등록하고, 창작의 세계를 넓혀보세요.</div>
                        </div>
                        <div className="form-container">
                            <form
                                onSubmit={handleSubmit(async (data) => {
                                    // await new Promise((r) => setTimeout(r, 1000));
                                    alert(JSON.stringify(data));
                                    axios
                                        .post("/api/users/signUpEmail/Designer", data)
                                        .then(() => console.log(data))
                                        .catch(err => console.log(err));
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
                                            <label>작가명(닉네임)</label>
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
                                        {errors.nickname && (<small className="error-message" role="alert">{errors.nickname.message}</small>)}
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
                                <div className="form-title-container">
                                    <div className="title">디자이너 정보</div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <div className="form-label-container">
                                            <label>업무용 이메일</label>
                                        </div>
                                        <input
                                            type="text"
                                            name="businessEmail"
                                            id="businessEmail"
                                            placeholder="이메일 입력"
                                            aria-invalid={isSubmitted
                                                ? errors.businessEmail
                                                    ? "true"
                                                    : "false"
                                                : undefined}
                                            {...register("businessEmail", {												
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: "이메일 형식에 맞지 않습니다.",
												},
											})}/>{" "}
                                        {
                                            errors.businessEmail && (
                                                <small className="error-message" role="alert">
                                                    {errors.businessEmail.message}
                                                </small>
                                            )
                                        }
                                        <div className="desc min">로그인 시 사용하는 이메일이 아닌 업무용 이메일을 등록해주세요.</div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label-container">
                                            <label for="phone">휴대폰 번호</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="ex.+821012345678"
                                            aria-invalid={isSubmitted
                                                ? errors.phoneNumber
                                                    ? "true"
                                                    : "false"
                                                : undefined}
                                            {...register("phoneNumber", {
                                                pattern: {
                                                value: /^\+[0-9]{1,3}\d{1,3}\d{1,4}\d{1,4}$/,
                                                message: "휴대폰 번호 형식에 맞지 않습니다.",
                                                },
                                            })}
                                        />{" "}
                                        {
                                            errors.phoneNumber && (
                                                <small className="error-message" role="alert">{errors.phoneNumber.message}</small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <div className="form-label-container">
                                            <label for="name">이름</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="ex.홍길동"
                                            aria-invalid={isSubmitted
                                                ? errors.name
                                                    ? "true"
                                                    : "false"
                                                : undefined}
                                            {...register("name", {
                                                minLength: {
                                                    value: 2,
                                                    message: "두 자리 이상 입력해주세요.",
                                                },
                                            })}/>{" "}
                                        {errors.name && (<small className="error-message" role="alert">{errors.name.message}</small>)}
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label-container">
                                            <label>소속</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="team"
                                            name="team"
                                            placeholder="팀 또는 회사명"
                                            aria-invalid={isSubmitted
                                                ? errors.team
                                                    ? "true"
                                                    : "false"
                                                : undefined}
                                            {...register("team")}/>{" "}
                                        {errors.team && (<small className="error-message" role="alert">{errors.team.message}</small>)}
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
    )
}