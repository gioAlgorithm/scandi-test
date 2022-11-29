import React from "react"
import { CartItems } from "../context/CartItems";
import { useContext } from "react";
import { CurrencyContext } from "../context/currencyContext";
import "./page.css"


export default function CartPage(){

    // alert for button
    function alertMessage(){
        alert("ORDERED!")
    }

    //state of cart items
    const {cartItems, onAdd, onRemove} = useContext(CartItems)

    const {selected} = useContext(CurrencyContext)

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
    const quantity = cartItems.reduce((a, q) => a + q.qty, 0)
    const itemTax = itemPriceHandler() * 0.21
    const itemTotal = itemPriceHandler() + itemTax
    

    return(
        <div className="cart-page">
            <div className="cart-inner-page">

                <h1 className="cart-page-name">CART</h1>

                <div className="cart-page-items">
                        {cartItems.length === 0 ? <h1 className="cart-is-empty">Cart Is Empty</h1> : ""}
                        {cartItems.map((item)=>(
                                <div key={item.id} className="cart-page-product">
                                    <div className="cart-page-info">
                                        <h1 className="cart-item-brand">{item.brand}</h1>
                                        <h1 className="cart-item-name">{item.name}</h1>
                                        <h1 className="cart-item-price">{
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
                                            {item.attributes.map(attributes =>(
                                                <div>
                                                    <h1 className="cart-page-attribute-name">{attributes.name}:</h1>
                                                    <div className="cart-page-attribute-btns" id={attributes.id}>{attributes.items.map(items=>(
                                                        <div>
                                                            <input 
                                                                
                                                                name={attributes.name + item.name} 
                                                                id={attributes.id + items.id + item.name}
                                                                type={"radio"}>
                                                            </input>
                                                            <label for={attributes.id + items.id + item.name } style={{backgroundColor: `${items.value}`, color: `${items.value}`}}>
                                                                {items.value}
                                                            </label>
                                                        </div>
                                                        
                                                    ))}</div>
                                                </div>
                                                

                                            ))}
                                    </div>

                                    <div className="page-image-button">
                                        <div className="qty-page-buttons"> 
                                            <button className="cart-page-plus-btn" onClick={() => onAdd(item)}>+</button>
                                            <h4 className="qty-count">{item.qty}</h4>
                                            <button className="cart-page-minus-btn" onClick={()=> onRemove(item)}>-</button>
                                        </div>

                                        <img className="cart-page-image" alt="product" src={item.gallery[0]} />
                                    </div>
                                </div>
                            ))}
                </div>
                <div className="cart-page-prices">
                    <h1 className="cart-page-tax">Tax 21%: {
                            <span>
                                { selected === '$' ? <span>${itemTax.toFixed(2)}</span> : ""}
                                { selected === '£' ? <span>£{itemTax.toFixed(2)}</span> : ""}
                                { selected === 'A$' ? <span>A${itemTax.toFixed(2)}</span> : ""}
                                { selected === '¥' ? <span>¥{itemTax.toFixed(2)}</span> : ""}
                                { selected === '₽' ? <span>₽{itemTax.toFixed(2)}</span> : ""}
                            </span>

                        }</h1>
                    <h1 className="quantity-page">Quantity: <span>{quantity}</span></h1>
                    <h1 className="cart-page-total">Total: {
                            <span>
                                { selected === '$' ? <span>${itemTotal.toFixed(2)}</span> : ""}
                                { selected === '£' ? <span>£{itemTotal.toFixed(2)}</span> : ""}
                                { selected === 'A$' ? <span>A${itemTotal.toFixed(2)}</span> : ""}
                                { selected === '¥' ? <span>¥{itemTotal.toFixed(2)}</span> : ""}
                                { selected === '₽' ? <span>₽{itemTotal.toFixed(2)}</span> : ""}
                            </span>

                        }</h1>
                    <button onClick={alertMessage} className="order">ORDER</button>
                </div>
                
            </div>
        </div>
    )
}