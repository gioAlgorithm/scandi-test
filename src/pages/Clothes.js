import React from "react"
import Card from "../component/Card"
import { useProducts } from "../hooks/useProducts"
import { CurrencyContext } from "../context/currencyContext";
import { useContext } from "react";
import "./page.css"






export default function Clothes(){
    const {selected} = useContext(CurrencyContext)
    const {data, error} = useProducts()
    
    if(error){
        return(
            <h1>ERROR... SOMETHING WENT WRONG</h1>
        )
    } 

    return(
        <div className="container">
            
            <div className="inner-container">
            <h1 className="category-name">Clothes</h1>
                <div className="content">
                    
                    {
                    // cards of the products
                    
                    data && (
                    <>
                        {data.categories[1].products.map(item=>(
                            
                                <Card    
                                    image={item.gallery[0]} 
                                    name={item.name}
                                    id={item.id}
                                    inStock={item.inStock}
                                    price={
                                        // change currency
                                        data && (
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
                                    }          
                                />
                            
                                ))}
                    </>)
                    }
                </div>
            </div>
        </div>
    )
}