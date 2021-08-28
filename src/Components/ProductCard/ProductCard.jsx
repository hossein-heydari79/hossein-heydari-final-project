import './ProductCard.style.css'
import { useDispatch } from 'react-redux';
import React from 'react';
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductCard = ({ id, image, model, category, price, btnColor = "bg-success" }) => {
    const dispatch = useDispatch()
    const handleAddToCart = (event) => {
        event.stopPropagation()
        dispatch({ type: "addProduct", payload: { id, model, category, price, image } })
    }
    return (
        <div className="product-card-container m-2" style={{ border: "1px solid lightgray", borderRadius: "5px" }}>
            <div className="text-center"><img className="m-4" src={image} alt="" /></div>
            <div className="text-center m-2"><h5>{model}</h5></div>
            <div className="text-center m-2">{price}<span style={{ margin: "10px" }}>تومان</span></div>
            <div className="text-center m-2">
                <div className="w-100 d-flex justify-content-between align-items-center px-3 py-1">
                    <FaShoppingCart size="20px" className="text-success sell-icons" onClick={handleAddToCart} style={{ cursor: "pointer" }} />
                    <FaHeart size="20px" className="text-danger sell-icons" onClick={(e) => e.stopPropagation()} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    )
}
export default ProductCard;