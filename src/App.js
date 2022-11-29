import React from "react"
import { Routes, Route} from "react-router-dom"
import SharedLayout from "./SharedLayout"
import All from "./pages/All"
import Tech from "./pages/Tech"
import Clothes from "./pages/Clothes"
import "./App.css"
import PDP from "./pages/PDP"
import CartPage from "./pages/CartPage"




export default function App(){
    return(
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<All />} />
                <Route path="tech" element={<Tech />} />
                <Route path="clothes" element={<Clothes />} />
                <Route strict exact path="/:id" element={<PDP />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
        </Routes>
    )
}
