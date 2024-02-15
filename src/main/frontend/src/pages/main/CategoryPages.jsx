import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Product from "../../components/Product";
import "../../styles/CategoryPages.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function CategoryPages() {
    // products 예시 데이터
    let products = [
        {
            id: 1,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "트렌디하고 독특한 디자인의 로고 만들어드립니다",
            category: "로고",
            designerName: "김작가",
            price: 5,
            like: 300,
            date: "2024-01-01"
        }, {
            id: 2,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "웹 UI UX 디자인",
            category: "웹앱",
            designerName: "이작가",
            price: 1,
            like: 122,
            date: "2024-01-02"
        }, {
            id: 3,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "앱 UI/UX 디자인",
            category: "웹앱",
            designerName: "홍작가",
            price: 12,
            like: 513,
            date: "2024-01-01"
        }, {
            id: 4,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "영화 포스터 디자인",
            category: "인쇄물",
            designerName: "김작가",
            price: 3,
            like: 12,
            date: "2024-01-04"
        }, {
            id: 5,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            designerName: "다람쥐",
            price: 6,
            like: 122,
            date: "2024-01-15"
        }, {
            id: 6,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "PPT 디자인",
            category: "PPT",
            designerName: "다람쥐",
            price: 12,
            like: 211,
            date: "2024-01-14"
        }, {
            id: 7,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "귀여운 캐릭터 디자인",
            category: "일러스트",
            designerName: "김밥",
            price: 15,
            like: 324,
            date: "2024-01-11"
        }, {
            id: 8,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "상반신 캐릭터 3D 모델링",
            category: "3D모델링",
            designerName: "김밥",
            price: 23,
            like: 3,
            date: "2024-01-19"
        }, {
            id: 9,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "심플한 웹 디자인",
            category: "웹앱",
            designerName: "생명수",
            price: 13,
            like: 17,
            date: "2024-01-2"
        }, {
            id: 10,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "브로슈어 디자인",
            category: "인쇄물",
            designerName: "hello",
            price: 3,
            like: 231,
            date: "2024-01-15"
        }, {
            id: 11,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            designerName: "다람쥐",
            price: 4,
            like: 53,
            date: "2024-01-15"
        }, {
            id: 12,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            designerName: "다람쥐",
            price: 6,
            like: 53,
            date: "2024-01-15"
        }, {
            id: 13,
            image: process.env.PUBLIC_URL + "/로고예시.jpg",
            name: "고급 명함 디자인",
            category: "인쇄물",
            designerName: "다람쥐",
            price: 6,
            like: 53,
            date: "2024-01-15"
        }
    ]; 

    /* const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); */

    /** 최신순, 인기순, 날짜순 정렬 */
    const [order, setOrder] = useState(["timeStamp", "createdAt"]);
    let sortedProducts = {};

    const handleSelected = (e) => {
        // option태그에서 지정한 value값을 가져와 할당
        const sortOrder = e.target.value;
        // [기준, 정렬방식]
        if (sortOrder === "ascOrder") {
            setOrder(["price", "ascOrder"]);
        } else if (sortOrder === "desOrder") {
            setOrder(["price", "desOrder"]);
        } else if (sortOrder === "popular") {
            setOrder(["like", "popular"]);
        } else {
            setOrder(["date", "createdAt"]);
        }
    };

    if (order[1] === "ascOrder") {
        sortedProducts = products && products.sort((a, b) => a[order[0]] - b[order[0]]);
        //오름차순
    } else if (order[1] === "desOrder" || order[1] === "popular") {
        sortedProducts = products && products.sort((a, b) => b[order[0]] - a[order[0]]);
        // 내림차순
    } else {
        sortedProducts = products && products.sort((a, b) => {
            const dateA = new Date(a[order[0]]);
            const dateB = new Date(b[order[0]]);

            return dateB - dateA;
        });
        //최신순
    }

    /** 카테고리 필터 */
    let {categoryName} = useParams();

    if (categoryName === undefined) {
        categoryName = "전체";
    }

    let filteredProducts = categoryName === "전체"
        ? products
        : products.filter((product) => product.category === categoryName);

    /** 검색 필터 */
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    if (search.trim() !== "") {
        filteredProducts = filteredProducts.filter((product) => {
            // name 정의 && name에 search 포함
            return product.name && product.name.toLowerCase().includes(search.trim().toLowerCase());
        });
    }

    return (
        <div className="main center-col">
            <div className="category-pages">
                <div className="inner">
                    <div className="toolbar">
                        <h2>{categoryName}
                            디자인</h2>
                        <div className="sort-wrap">
                            <form>
                                <select className="sort" name="sort" onChange={handleSelected}>
                                    <option value="creatAt">최신순</option>
                                    <option value="popular">좋아요순</option>
                                    <option value="ascOrder">가격오름차순</option>
                                    <option value="desOrder">가격내림차순</option>
                                </select>
                            </form>
                            <div className="search">
                                <input type="text" placeholder="키워드 검색" value={search} onChange={onChange}/>
                                <button type="submit">
                                    <FontAwesomeIcon
                                        className="search-icon"
                                        icon={faMagnifyingGlass}
                                        size="xl"
                                        style={{
                                            color: "#CFCFCF"
                                        }}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-container">
                        {
                            filteredProducts.map(
                                (product) => (<Product key={product.id} product={product}/>)
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}