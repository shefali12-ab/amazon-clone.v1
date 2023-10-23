import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Checkout from './Checkout';
import {Link} from  'react-router-dom';
import {useStateValue} from "./StateProvider"
import {auth} from "./firebase"
function Header() {
      const [{basket,user},dispatch]=useStateValue();
      const handleAuthentication =()=>{
            if(user){
                  auth.signOut();
            }
      }
  return (
    <div className='header'>
        {/* amazonlogo */}
         <Link to="/">
        <img className='header-logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'></img>
        </Link>
        {/* amazonsearchbar */}
        <div className='header-searchBar'>
         <input className='header-searchInput' type='text'></input>
         <SearchIcon className='header-searchIcon'/>
        </div>
        {/* header-other-component */}
        <div className='header-nav'>
            <Link to={!user && "/Login"} style={{ color: 'white' ,textDecoration: 'none' }}>
            <div onClick={handleAuthentication}className='header-option'>
                  <span className='header-optionline1'>Hello {!user ? "Guest" :user.email}</span>
                  <span className='header-optionline2'>{user?'Sign Out':'Sign In'}</span>
                  
            </div>
            </Link>
            <Link to="/Orders" style={{ color: 'white' ,textDecoration: 'none' }}>
            <div className='header-option'>
                  <span className='header-optionline1'>Returns</span>
                  <span className='header-optionline2'> & Orders</span>
            </div>
            
            </Link>
            
            <div className='header-option'>
                  <span className='header-optionline1'>Your</span>
                  <span className='header-optionline2'>Prime</span>
            </div>
            <Link to="/Checkout" style={{ color: 'white' ,textDecoration: 'none' }}>
            <div className='header-optionBasket'>
                
                <ShoppingBasketIcon/>
               
                 <span className='header-optionline2 header-basketCount'>{basket?.length}</span> 
            </div>
            </Link> 
        </div>

    </div>
  )
}

export default Header