import {useContext} from "react";
import {useForm} from "react-hook-form";
import {UserContext} from "./AuthProvider";
import {defaultHeaders} from "../config/clientConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStarOfLife} from "@fortawesome/free-solid-svg-icons";

import '../index.css';
import {signInGoogle} from "../auth/firebaseAuth";
import {getAuth, updateProfile} from "firebase/auth";

const RegisterForm = ({setRegisterFormOpen}) => {
    const {
        register,
        formState: {
            isSubmitted,
            isSubmitting,
            isValid,
            errors
        }
    } = useForm({mode: "onChange"});

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`nickname :${event.target.nickname.value}`);
        await signInGoogle();
        const auth = getAuth();
        await updateProfile(auth.currentUser, {
            displayName: `${event.target.nickname.value}`
        })
        console.log(auth.currentUser.displayName)
        // try {
        //     const res = await fetch("/api/users/signUpGoogle", {
        //         method: "POST",
        //         headers: defaultHeaders,
        //         body: JSON.stringify({nickname: event.target.nickname.value})
        //     });
        //
        //     if (!res.ok) {
        //         throw new Error(`API 요청 실패: ${res.statusText}`);
        //     }
        //
        //     const user = await res.json();
        //     console.log(`post /users ${JSON.stringify(user)}`);
        //     setRegisterFormOpen(false);
        // } catch (error) {
        //     console.error("회원가입 실패:", error);
        //     // 사용자에게 에러 메시지 표시
        // }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <input
                    className='submit-button'
                    type="submit"
                    value="Sign up"
                    disabled={isSubmitting && !isValid}
                    style={{
                        backgroundColor: isValid
                            ? "#8220FF"
                            : "#CFCFCF"
                    }}/>
            </form>
        </div>
    );
}

export default RegisterForm;