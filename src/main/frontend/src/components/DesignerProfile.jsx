import React from 'react';
export default function DesignerProfile(props) {

    return (
        <div className="designer-profile">
            <div className="profile-image">
                {
                    props.designer.image
                        ? (
                            <img
                                src={props.designer.image}
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
            <div className="designer-info-content">
                <p className="point-desc">{props.designer.name}</p>
                <p className="desc">{props.designer.businessEmail}</p>
            </div>
            <div className="button-container items__more">
                <div className="button gray">문의하기</div>
            </div>
        </div>
    )
}