import React from 'react'
import './Home.css'
import Product from './Product.js'
function Home() {
  return (
    <div className='home'> 
    <div className='home-container'>
        <img  className='home-image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt=''/>
     <div className='home-row'>
     
       
      <Product id="12321341"title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback' price={11.9} image='https://images-eu.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' rating={3}/>
      
      <Product id="49538094"title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl' price={239.9} image='https://m.media-amazon.com/images/I/718Bxs69wUL._SL1500_.jpg' rating={4}/>
      
     </div>
     <div className='home-row'>
       
        <Product id="4903850"
        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
        price={98.99} image='https://m.media-amazon.com/images/I/91f6SmYBPLL._SX679_.jpg' rating={3}/>
        <Product id="23445930" title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric" price={98.99} image='https://m.media-amazon.com/images/I/61EXU8BuGZL._SX522_.jpg' rating={5}/>
        <Product id="3254354345" title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB)- Silver (4th Generation)" price={598.99} image='https://m.media-amazon.com/images/I/814P0ojHArL._SX679_.jpg' rating={4}/>
     </div>
     <div className='home-row'>
        
     <Product id="90829332" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440" price={109.98} image='https://m.media-amazon.com/images/I/81z4qLkLBnL._SL1500_.jpg' rating={4}/>
        
     </div>
   
    </div>
    
    </div>
  )
}

export default Home