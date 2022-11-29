import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"
import { CurrencyContext } from "./context/currencyContext"
import { useState } from "react"
import { CartItems } from "./context/CartItems"
import { useProduct } from "./hooks/useProduct"
import { useParams } from "react-router-dom"


export default function SharedLayout(){

    // graphql data
    const {id} = useParams()
    const {data} = useProduct(id)
    const Data = data && data.product

    // state for currency change
    const [selected, setSelected] = useState('$')

    // using this state with empty array to add items
    const [cartItems, setCartItems] = useState([])

    // function that adds items inside the cart 
    const onAdd = (Data) =>{
        const exist = cartItems.find((x)=> x.id === Data.id)
        if(exist){
            setCartItems(
                cartItems.map(x => x.id === Data.id ? {...exist, qty: exist.qty + 1} : x    
                )
            )
        } else{
            setCartItems([...cartItems, {...Data, qty: 1}])
        }
    }
    // function that removes items 
    const onRemove = (Data) => {
        const exist = cartItems.find((x)=> x.id === Data.id)

        if(exist.qty === 1){
            setCartItems(cartItems.filter((x) => x.id !== Data.id))
        } else {
            setCartItems(cartItems.map((x)=> x.id === Data.id ? {...exist, qty: exist.qty - 1} : x))
        }
    }
    

    return(
        <div>
            <CartItems.Provider value={{cartItems,setCartItems, onAdd, Data, onRemove}}>
                <CurrencyContext.Provider value={{selected, setSelected}}>
                    <Navbar />
                    <Outlet />
                </CurrencyContext.Provider>
            </CartItems.Provider>
        </div>
    )
}