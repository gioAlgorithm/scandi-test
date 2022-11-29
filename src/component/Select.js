import React, { useEffect, useRef } from "react"
import {useCurrency} from "../hooks/useCurrency"
import { useState, useContext } from "react";
import { CurrencyContext } from "../context/currencyContext";
import { FaAngleUp } from "react-icons/fa";
import "./css/component-style.css"

export default function Select(){
    //data from graphql using hook   
    const { data} = useCurrency()

    //dropdown of select
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () =>{
        setDropdown((state) => !state)
    }

    // select functionality
    const {selected,setSelected} = useContext(CurrencyContext)

    // detecting outside click
    let menuRef = useRef()

    useEffect(()=>{
        let handler = (event) =>{
            if(!menuRef.current.contains(event.target)){
                setDropdown(false)
            }
        }


        document.addEventListener("mousedown", handler)

        return ()=>{
            document.removeEventListener("mousedown", handler)
        }
    })
  
  
  return(
    <div>
        {data && (<>
            
            <div ref={menuRef} className={`select ${dropdown ? "select--active" : ""}`}>
        
                <button onClick={toggleDropdown} className="select__button">{selected ? selected  : data.currencies[0].symbol} {<FaAngleUp className="select__icon" />}</button>
                {
                // whenever dropdown is truthy 
                dropdown && (<div className="select__dropdown">
                    {data && (
                        <>
                        {data.currencies.map(cash=>(
                            <button onClick={()=> {
                                setSelected(cash.symbol)
                                setDropdown(false)
                            }} > {cash.symbol} {cash.label}</button>
                        ))}
                        
                        
                        </>
                    )}
                </div>)}   
            </div>
        </>)}
    
    </div>
  )
}