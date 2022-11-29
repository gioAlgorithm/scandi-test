import React, { useContext } from "react"
import { FiShoppingCart } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import "./css/component-style.css"
import { CartItems } from "../context/CartItems";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../context/currencyContext";



export default function Cart(){

    // alert for button
    function alertMessage(){
        alert("ORDERED!")
    }

    //state of cart items
    const {cartItems, onAdd, onRemove} = useContext(CartItems)

    const {selected} = useContext(CurrencyContext)

    // dropdown of cart

    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () =>{
        setDropdown((state) => !state)
    }
    // detecting outside click
    let cartRef = useRef()

    useEffect(()=>{
        let handler = (event) =>{
            if(!cartRef.current.contains(event.target)){
                setDropdown(false)
            }
        }


        document.addEventListener("mousedown", handler)

        return ()=>{
            document.removeEventListener("mousedown", handler)
        }
    })


    // calculating prices
    const itemPriceHandler = ()=>{
        let itemPrice = cartItems
        if(selected === "$"){
           itemPrice = cartItems.reduce((a, c) => a + c.prices[0].amount * c.qty, 0)
        } if(selected === "£"){
            itemPrice = cartItems.reduce((a, c) => a + c.prices[1].amount * c.qty, 0)
        } if(selected === "A$"){
            itemPrice = cartItems.reduce((a, c) => a + c.prices[2].amount * c.qty, 0)
        } if(selected === "¥"){
            itemPrice = cartItems.reduce((a, c) => a + c.prices[3].amount * c.qty, 0)
        } if(selected === "₽"){
            itemPrice = cartItems.reduce((a, c) => a + c.prices[4].amount * c.qty, 0)
        }
        return itemPrice
    }
    const itemTax = itemPriceHandler() * 0.21
    const itemTotal = itemPriceHandler() + itemTax


    return(
        <div ref={cartRef} className={`cart ${dropdown ? "cart--active" : ""}`}>
            <button onClick={toggleDropdown} className="cart-btn">
                <FiShoppingCart />
                {cartItems.length ? (<div className="quantity">{cartItems.length}</div>) : ""}
            </button>


            {
                // whenever dropdown is truthy
                dropdown && (
                    <div className="cart__dropdown">
                        <div className="inner-cart">
                            <h3 className="my-bag">my bag</h3>
                            <div className="cart-items">
                                {cartItems.length === 0 && <h5>Cart Is Empty</h5>}
                                {cartItems.map((item)=>(
                                    <div key={item.id} className="cart-product">
                                        <div className="cart-info">
                                            <h1 className="cart-name">{item.name}</h1>
                                            <h1 className="cart-price">{
                                                (
                                                    <>              
                                                        <span>
                                                            {
                                                                selected === '$' ? <span>{item.prices[0].currency.symbol}{item.prices[0].amount}</span>
                                                                : " "
                                                            }
                                                            {
                                                                selected === '£' ? <span>{item.prices[1].currency.symbol}{item.prices[1].amount}</span>
                                                                : " "
                                                            }
                                                            {
                                                                selected === 'A$' ? <span>{item.prices[2].currency.symbol}{item.prices[2].amount}</span>
                                                                : " " 
                                                            }
                                                            {
                                                                selected === '¥' ? <span>{item.prices[3].currency.symbol}{item.prices[3].amount}</span>
                                                                : " " 
                                                            }
                                                            {
                                                                selected === '₽' ? <span>{item.prices[4].currency.symbol}{item.prices[4].amount}</span>
                                                                : " " 
                                                            }
                                                        </span>
                                                    </>
                                                    )
                                            }</h1>
                                            
                                        </div>

                                        <div className="qty-buttons"> 
                                            <button className="cart-plus-btn" onClick={() => onAdd(item)}>+</button>
                                            <h4 className="qty-count">{item.qty}</h4>
                                            <button className="cart-minus-btn" onClick={()=> onRemove(item)}>-</button>
                                        </div>

                                        <img className="cart-image" alt="product" src={item.gallery[0]} />
                                    </div>
                                ))}
                            </div>
                            <div className="item-total-price">
                                <h2>Total</h2>
                                <h1>
                                    {
                                       <span>
                                            { selected === '$' ? <span>${itemTotal.toFixed(2)}</span> : ""}
                                            { selected === '£' ? <span>£{itemTotal.toFixed(2)}</span> : ""}
                                            { selected === 'A$' ? <span>A${itemTotal.toFixed(2)}</span> : ""}
                                            { selected === '¥' ? <span>¥{itemTotal.toFixed(2)}</span> : ""}
                                            { selected === '₽' ? <span>₽{itemTotal.toFixed(2)}</span> : ""}
                                       </span>
                                    }
                                </h1>
                            </div>

                            <div className="inner-cart-buttons">
                                <Link to="/cart" onClick={toggleDropdown}  className="view-bag">VIEW BAG</Link>
                                <button onClick={alertMessage} className="check-out">CHECK OUT</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}