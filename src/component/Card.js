import React, { useContext } from "react"
import "./css/card.css"
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartItems } from "../context/CartItems";



export default function Card(props){

    const {onAdd, Data, selectedBtnValue } = useContext(CartItems)

    return(
        <div className="card" key={props.id}>
            <Link to={`/${props.id}`} >
                <span>
                    <img alt="products" src={props.image} className={props.inStock ? "card-image" : "card-image-instock"} />
                    <h1 className={props.inStock ? "card-invisible-instock" : "card-visible-instock"}>OUT OF STOCK</h1>
                </span>
                <h1 className="card-name">{props.name}</h1>
                <h1 className="card-price">{props.price}</h1>  
            </Link>
            <button className={props.inStock ? "cart-button" : "cart-invisible-button"}><FiShoppingCart /></button>
        </div>
    )
}