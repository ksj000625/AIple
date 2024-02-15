import {useState} from "react";
import { Link } from "react-router-dom";
import "../../styles/ImgButton.css"
import RegisterForm from "../../components/RegisterForm";
import Modal from 'react-modal';
import "../../styles/Modal.css"


export default function Signup() {
    let [modal, setModal] = useState(false);

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    
    return (
        <div className="signup bg">
            {/* <header>header</header> */}
            <div className="main">
                <div className="inner">
                    <div className="main-container padding-topdown">
                        <div className="title-container">
                            <div className="title">AIple 회원가입</div>
                            <div className="desc">
                                AIple에서는 창작의 힘을 이어받습니다.
                                <br/>
                                여러분의 아이디어와 우리의 AI 디자이너가 만나는 순간,
                                <br/>
                                놀라운 일이 시작됩니다
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
                            <button className="google-button" onClick={openModal}>Google 계정으로 가입</button>
                            <Modal className="modal" isOpen={modal} onRequestClose={closeModal}><RegisterForm/></Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}