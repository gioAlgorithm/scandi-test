import React from "react"
import { useState } from "react"
import "./page.css"
import { Markup } from 'interweave';
import { CurrencyContext } from "../context/currencyContext";
import { useContext } from "react";
import { CartItems } from "../context/CartItems"

export default function PDP(){


    // usecontext for currency change
    const {selected} = useContext(CurrencyContext)
    const {onAdd, Data} = useContext(CartItems)


    // change main image
    
    const [mainImage, setMainImage] = useState('')
    
    // turn description into html
    const articleContent = Data && Data.description

    if (!Data) return <p>Not found</p>;

    // currency changer
    function currencyHandler(){
        return(
            <div>
                     
                            
                    <span>
                        {
                            selected === '$' ? <span>{Data.prices[0].currency.symbol}{Data.prices[0].amount}</span>
                            : " "
                        }
                        {
                            selected === '£' ? <span>{Data.prices[1].currency.symbol}{Data.prices[1].amount}</span>
                            : " "
                        }
                        {
                            selected === 'A$' ? <span>{Data.prices[2].currency.symbol}{Data.prices[2].amount}</span>
                            : " " 
                        }
                        {
                            selected === '¥' ? <span>{Data.prices[3].currency.symbol}{Data.prices[3].amount}</span>
                            : " " 
                        }
                        {
                            selected === '₽' ? <span>{Data.prices[4].currency.symbol}{Data.prices[4].amount}</span>
                            : " " 
                        }
                    </span>
                            
    
               
            </div>
        )
    }
    

    return(
        <div key={Data.id} className="product-container">
            
            {Data && (
                <> 
                    <div className="image-gallery">
                        {Data.gallery.map(image=>(
                            <img onClick={()=> setMainImage(image)} alt="products" src={image} />
                        ))}
                    </div>
                    <div className="main-image">
                        <img alt="product" src={mainImage ? mainImage : Data.gallery[0]} />
                    </div>
                    <div className="product-info">
                        <h1 className="product-brand">{Data.brand}</h1>
                        <h1 className="product-name">{Data.name}</h1>
                        <div className="product-attributes">
                            {Data.attributes.map(attributes=>(
                                    <div>
                                            
                                        <h1 className="product-size">{attributes.name}:</h1>
                                        <div className="product-buttons" id={attributes.id}>{attributes.items.map(items=>(
                                            <div>
                                                <input 
                                                    value={items.value}
                                                    name={attributes.name} 
                                                    id={attributes.id + items.id}
                                                    type={"radio"}>
                                                </input>
                                                <label for={attributes.id + items.id} style={{backgroundColor: `${items.displayValue}`, color: `${items.value}`}}>
                                                    {items.value}
                                                </label>
                                            </div>
                                            
                                        ))}</div>
                                        
                                    </div>
                                ))}
                        </div>
                        <h1 className="product-info-price">Price:</h1>
                        <h1 className="product-info-price-amount">{currencyHandler()}</h1>
                        <button onClick={Data.inStock ? () => onAdd(Data) : ""} className={Data.inStock ?"add-to-cart-btn" : "cant-add-to-cart-btn"}>{Data.inStock ? "ADD TO CART" : "OUT OF STOCK"}</button>
                        <Markup className="product-description" content={articleContent} />
                    </div>
                    
                </>
            )}  
            </div>   
    )
}