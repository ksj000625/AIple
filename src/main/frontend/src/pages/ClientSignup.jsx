import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "../styles/Form.css";
import axios from "axios";

export default function ClientSignup() {

	const [profileImage, setProfileImage] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isSubmitted, errors },
	} = useForm();

	const inputRef = useRef(null);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			setProfileImage(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleProfileClick = () => {
		inputRef.current.click();
	};

	return (
		<div className="ClientSignup">
			{/* <header>header</header> */}
			<div className="main">
				<div className="inner">
					<div className="main-col-container">
						<div className="center-title-container">
							<div className="title">고객 회원가입</div>
							<div className="desc">
								AI의 힘을 경험하세요. 지금 바로 가입 하고, 당신만의 디자인을
								의뢰하세요.
							</div>
						</div>
						<div className="form-container">
							<form
								onSubmit={handleSubmit(async (data) => {
									// await new Promise((r) => setTimeout(r, 1000));
									alert(JSON.stringify(data));
									axios.post("/api/user/signUpUser", JSON.stringify(data))
										.then(()=> console.log(data))
										.catch(err => console.log(err));
								})}
							>
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
													color: "#fe3939",
												}}
											/>
										</div>
										<input
											type="text"
											id="email"
											name="email"
											placeholder="이메일 입력"
											aria-invalid={
												isSubmitted
													? errors.email
														? "true"
														: "false"
													: undefined
											}
											{...register("email", {
												required: "이메일을 입력해주세요.",
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: "이메일 형식에 맞지 않습니다.",
												},
											})}
										/>{" "}
										{errors.email && (
											<small className="error-message" role="alert">
												{errors.email.message}
											</small>
										)}
									</div>
									<div className="form-group">
										<div className="form-label-container">
											<label>비밀번호</label>
											<FontAwesomeIcon
												icon={faStarOfLife}
												size="2xs"
												style={{
													color: "#fe3939",
												}}
											/>
										</div>
										<input
											type="password"
											id="password"
											name="password"
											placeholder="8자 이상 20자 이내 영문/숫자 포함"
											aria-invalid={
												isSubmitted
													? errors.password
														? "true"
														: "false"
													: undefined
											}
											{...register("password", {
												required: "비밀번호를 입력해주세요.",
												minLength: {
													value: 8,
													message: "8자리 이상 입력해주세요.",
												},
											})}
										/>{" "}
										{errors.password && (
											<small className="error-message" role="alert">
												{errors.password.message}
											</small>
										)}
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
													color: "#fe3939",
												}}
											/>
										</div>
										<input
											type="text"
											id="nickname"
											name="nickname"
											placeholder="ex.에이플"
											aria-invalid={
												isSubmitted
													? errors.nickname
														? "true"
														: "false"
													: undefined
											}
											{...register("nickname", {
												minLength: {
													value: 2,
													message: "두 자리 이상 입력해주세요.",
												},
											})}
										/>{" "}
										{errors.nickname && (
											<small role="alert">{errors.nickname.message}</small>
										)}
									</div>
									<div className="form-group">
										<div className="form-label-container">
											<label>프로필 이미지 등록</label>
										</div>
										<div className="profile-container">
											<div
												className="profile-image"
												onClick={handleProfileClick}
											>
												{profileImage ? (
													<img
														src={profileImage}
														alt="프로필 이미지"
														style={{
															width: "100%",
															height: "100%",
															objectFit: "cover",
															borderRadius: "50%",
														}}
													/>
												) : (
													<img
														alt="profileImage"
														src={process.env.PUBLIC_URL + "/user-solid.svg"}
													/>
												)}
											</div>
											<input
												type="file"
												accept="image/*"
												ref={inputRef}
												onChange={handleImageUpload}
												style={{
													display: "none",
												}}
											/>
										</div>
									</div>
								</div>

								<div className="submit-button-container">
									<button
										type="submit"
										disabled={isSubmitting}
										className="submit-button"
									>
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
