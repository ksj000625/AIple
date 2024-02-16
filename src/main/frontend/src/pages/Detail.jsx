import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShareNodes, faCheck, faX} from "@fortawesome/free-solid-svg-icons";
import "../styles/Detail.css";
import DetailTab from "../components/DetailTab";
import DesignerProfile from "../components/DesignerProfile";

function Detail() {

    // 서버에서 상품 및 디자이너 정보 가져오기
    /* const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [designer, setDesigner] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(pData => {
                setProduct(pData);
                fetch(`/api/designers/${product.designerId}`)
                    .then(res => res.json())
                    .then(dData => {
                        setDesigner(dData);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id, products, designers]);

    if (!product || !designer) {
        return <div>Loading...</div>;
    }  */

    /** 상세정보 더미데이터 및 예비코드 추후 삭제 */
    let products = [
        {
            id: 1,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "트렌디하고 독특한 디자인의 로고 만들어드립니다",
            category: "로고",
            designerId: "D1",
            price: 5,
            like: 300,
            date: "2024-01-01",
            period: "5~7일",
            modify: 2,
            draft: 1,
            origin: true,
            size: "1000*1000 이내",
            descImg: "https://cdn-dantats.stunning.kr/prod/markets/81696fb7-1090-46db-bd54-f4b700e4d" +
                    "6ce/store/NrcnTzJtvQqfWH7N.pm01.jpg"
        }, {
            id: 2,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "웹 UI UX 디자인",
            category: "웹앱",
            designerId: "D2",
            price: 1,
            like: 122,
            date: "2024-01-02",
            period: "5~7일",
            modify: 2,
            draft: 1,
            origin: true,
            size: "1000*1000 이내"
        }, {
            id: 3,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "앱 UI/UX 디자인",
            category: "웹앱",
            designerId: "D3",
            price: 1,
            like: 122,
            date: "2024-01-02",
            period: "5~7일",
            modify: 2,
            draft: 1,
            origin: true,
            size: "1000*1000 이내"
        }, {
            id: 4,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "영화 포스터 디자인",
            category: "인쇄물",
            designerId: "D4",
            price: 3,
            like: 12,
            date: "2024-01-04",
            period: "5~7일",
            modify: 2,
            draft: 1,
            origin: true,
            size: "1000*1000 이내"
        }, {
            id: 5,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            price: 6,
            like: 122,
            date: "2024-01-15"
        }, {
            id: 6,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "PPT 디자인",
            category: "PPT",
            price: 12,
            like: 211,
            date: "2024-01-14"
        }, {
            id: 7,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "귀여운 캐릭터 디자인",
            category: "일러스트",
            price: 15,
            like: 324,
            date: "2024-01-11"
        }, {
            id: 8,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "상반신 캐릭터 3D 모델링",
            category: "3D모델링",
            price: 23,
            like: 3,
            date: "2024-01-19"
        }, {
            id: 9,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "심플한 웹 디자인",
            category: "웹앱",
            price: 13,
            like: 17,
            date: "2024-01-2"
        }, {
            id: 10,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "브로슈어 디자인",
            category: "인쇄물",
            price: 3,
            like: 231,
            date: "2024-01-15"
        }, {
            id: 11,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            price: 4,
            like: 53,
            date: "2024-01-15"
        }, {
            id: 12,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            price: 6,
            like: 53,
            date: "2024-01-15"
        }, {
            id: 13,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            price: 6,
            like: 53,
            date: "2024-01-15"
        }
    ]

    const designers = [
        {
            id: "D1",
            name: "김작가",
            businessEmail: "d1@gmail.com",
            image: null
        }, {
            id: "D2",
            name: "김밥",
            businessEmail: "d2@gmail.com",
            image: null
        }, {
            id: "D3",
            name: "단무지",
            businessEmail: "d3@gmail.com",
            image: null
        }
    ]

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [designer, setDesigner] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(item => item.id === parseInt(id));
        setProduct(foundProduct);
        const foundDesigner = designers.find(
            item => item.id === foundProduct.designerId
        );
        setDesigner(foundDesigner);
    }, [id]);

    if (!product || !designer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="center">
            <div className="main max-width">
                <div className="inner category-bar-padding">
                    <div className="main-container">
                        <div className="detail-container">
                            <img className="product-image" src={product.image} alt={product.name}/>
                            <DetailTab product={product} designer={designer}/>
                        </div>
                        <div className="card">
                            <div className="prod-card-header">
                                <h2>{product.name}</h2>
                                <div className="icon-container">
                                    <FontAwesomeIcon className="icon" icon={faHeart} size="xl"/>
                                    <FontAwesomeIcon className="icon" icon={faShareNodes} size="xl"/>
                                </div>
                            </div>
                            <div className="prod-card-content">
                                <div className="prod-desc-container">
                                    <div className="prod-desc">
                                        <p className="desc">작업 기간</p>
                                        <p className="desc point-desc">{product.period}</p>
                                    </div>
                                    <div className="prod-desc">
                                        <p className="desc">수정 횟수</p>
                                        <p className="desc point-desc">{product.modify}</p>
                                    </div>
                                    <div className="prod-desc">
                                        <p className="desc">시안 수</p>
                                        <p className="desc point-desc">{product.draft}만원</p>
                                    </div>
                                    <div className="prod-desc">
                                        <p className="desc">카테고리</p>
                                        <p className="desc point-desc">{product.category}</p>
                                    </div>
                                    <div className="prod-desc">
                                        <p className="desc">원본 제공</p>
                                        {
                                            product.origin == true
                                                ? <FontAwesomeIcon className="icon" icon={faCheck}/>
                                                : <FontAwesomeIcon className="icon" icon={faX}/>
                                        }
                                    </div>
                                    <div className="prod-desc">
                                        <p className="desc">규격</p>
                                        <p className="desc point-desc">{product.size}</p>
                                    </div>
                                </div>
                                <div className="button-container">
                                    <div className="button submit-button">구매하기</div>
                                </div>
                            </div>
                            <DesignerProfile designer={designer}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Detail;