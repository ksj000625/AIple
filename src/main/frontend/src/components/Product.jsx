import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "../styles/Product.css";

export default function Product({product}) {
    return (
            <Link className="product" to={`/main/detail/${product.id}`}>
                <img src={product.image} alt={product.name}/>
                <span className="product-category">{product.category}</span>
                <p className="product-name">{product.name}</p>
                <div className="like-button">
                    <FontAwesomeIcon className="like-icon" icon={faHeart}/>
                    <span className="product-desc">{product.like}</span>
                </div>
                <div className="product-info">
                    <p className="product-desc">{product.designerName}</p>
                    <h3 className="product-price">{product.price}만원 ~</h3>
                </div>
            </Link>
    )
}