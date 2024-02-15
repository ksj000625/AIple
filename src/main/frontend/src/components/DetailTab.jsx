import {useRef, useState, useEffect} from 'react';
import "../styles/Detail.css";
import DesignerProfile from './DesignerProfile';
import ToTheTop from './ToTheTop';
export default function DetailTab(props) {
    const descRef = useRef(null);
    const reviewRef = useRef(null);
    const designerInfoRef = useRef(null);
    const [activeTab, setActiveTab] = useState('desc');

    const [clicked, setClicked] = useState(false);
    const onClick = () => setClicked(!clicked);

    // 스크롤 탭
    useEffect(() => {
        const scrollToRef = (ref) => {
            if (ref.current) {
                ref
                    .current
                    .scrollIntoView({behavior: 'smooth'});
            }
        };
        switch (activeTab) {
            case 'desc':
                scrollToRef(descRef);
                break;
            case 'review':
                scrollToRef(reviewRef);
                break;
            case 'designerInfo':
                scrollToRef(designerInfoRef);
                break;
            default:
                break;
        }
    }, [activeTab]);

    return (
        <div className="detail-tab">
            <ul className="tab-title-container">
                <li
                    className={`${clicked
                        ? 'tab-title tab-title-selected'
                        : 'tab-title'}`}
                    onClick={() => setActiveTab('desc') && onClick()}>
                    상세설명
                </li>
                <li
                    className={`${clicked
                        ? 'tab-title tab-title-selected'
                        : 'tab-title'}`}
                    onClick={() => setActiveTab('review') && onClick()}>리뷰</li>
                <li
                    className={`${clicked
                        ? 'tab-title tab-title-selected'
                        : 'tab-title'}`}
                    onClick={() => setActiveTab('designerInfo') && onClick()}>디자이너 정보</li>
            </ul>
            <div className="tab-contents">
                <div className="product-content" ref={descRef}>
                    <h2>상세 설명</h2>
                    <img className="product-desc-img" src={props.product.descImg}/>
                </div>
                <div className="product-content" ref={reviewRef}>
                    <h2>리뷰</h2>
                    <div>리뷰내용</div>
                </div>
                <div className="product-content" ref={designerInfoRef}>
                    <h2>디자이너 정보</h2>
                    <DesignerProfile designer={props.designer}/>
                </div>
            </div>
            <ToTheTop/>
        </div>
    )
}