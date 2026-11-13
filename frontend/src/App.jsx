import React,{useState} from 'react'
import { Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Manu from './pages/Manu'
import PlaceOrder from './pages/PlaceOrder'
import Verify from './pages/Verify'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import CartDrawer  from './components/CartDrawer'
import MyOrder from "./pages/myOrder"
const App = () => {
  return (
    
    <div>
      <Navbar />
        <CartDrawer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Manu />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />  
       <Route path="/myorders" element={<MyOrder />} />              
      </Routes>

      <Footer />
    </div>
  )
}

export default App;