import React from "react"
import { Link, NavLink } from "react-router-dom"
import Cart from "./Cart"
import "./css/component-style.css"
import Logo from "./Logo"
import Select from "./Select"


export default function Navbar(){



    return(
        <div className="nav-container">
            <nav>
                <div className="inner-nav-container">
                    <NavLink  to="/"
                        className={({isActive})=>(
                            isActive ? 'nav-link-active' : 'nav-link'
                        )}
                    end>ALL</NavLink>
                    <NavLink  to="/tech"
                        className={({isActive})=>(
                            isActive ? 'nav-link-active' : 'nav-link'
                        )}
                    >TECH</NavLink>
                    <NavLink  to="/clothes"
                        className={({isActive})=>(
                            isActive ? 'nav-link-active' : 'nav-link'
                        )}
                    >CLOTHES</NavLink>
                </div>
                
                
                <div className="undo-logo">
                    <Link to="/">  <Logo /> </Link>
                </div>

                <div className="select-cart">
                    <div>
                        <Select />
                    </div>

                    <div>
                        <Cart />
                    </div>
                    
                </div>
            </nav>
            
        </div>
    )
}