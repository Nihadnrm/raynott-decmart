import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import AllProducts from './components/AllProducts'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MyOrders from './components/MyOrders'
import OrderSuccess from './components/OrderSuccess'
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import AdminOrders from './admin/AdminOrders'
import AdminUsers from './admin/AdminUsers'
import Messages from './admin/Messages'
import Auth from './components/Auth'
import About from './components/About'







function App() {

    const Location=useLocation()
    const hideNavbar=
                 location.pathname.startsWith("/admin") ||
                 location.pathname.startsWith("/addproduct") ||
                 location.pathname.startsWith("/adminorders") ||
                 location.pathname.startsWith("/users") ||
                 location.pathname.startsWith("/messages") ||
                 location.pathname.startsWith("/auth") 


  return (


    <>


    {!hideNavbar && <Navbar />}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/details/:id' element={<ProductDetails/>}/>
      <Route path='/allproducts' element={<AllProducts/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      <Route path='/success' element={<OrderSuccess/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/adminorders' element={<AdminOrders/>}/>
      <Route path='/users' element={<AdminUsers/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/about' element={<About/>}/>
       





    </Routes>
         {!hideNavbar && <Footer />}

    </>
  )
}

export default App
