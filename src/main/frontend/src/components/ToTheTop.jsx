import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp} from "@fortawesome/free-solid-svg-icons";
function ToTheTop() {
    const [toggleBtn, setToggleBtn] = useState(true);

    // window 객체에서 scrollY 값을 받아옴 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
    const handleScroll = () => {
        const {scrollY} = window;

        scrollY > 200
            ? setToggleBtn(true)
            : setToggleBtn(false);
    };

    // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return() => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
    const goToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
    return toggleBtn
        ? (
            <button className="tothetop" onClick={goToTop}>
                <FontAwesomeIcon icon={faCircleUp} size="2xl"/>
                <span className="title"> 맨 위로</span>
            </button>
        )
        : null;
}

export default ToTheTop;