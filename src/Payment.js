import React  from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom'
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js'
import { useState ,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios';
import {db} from './firebase'

function Payment() {
    const [{basket,user},dispatch]= useStateValue();
    const stripe= useStripe();
    const elements=useElements();
    const [succeeded, setSucceeded]= useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        //generate the special stripe secret which allows us to charge a customer
      const getClientSecret=async ()=>{
        const price= getBasketTotal(basket);
        console.log(price);
    //     const response = await axios({
    //         method:'post',
    //         //stripe expects the total in a currencies subunits
    //         url:`/payments/create?total=${getBasketTotal(basket)*100}`
              
    //     });
    //   // setClientSecret(response.data.clientSecret)
    //     console.log("this is response data",response);
      }
      getClientSecret();
      //console.log(getClientSecret())
    },[basket])
    //whenever basket changes it will make this request and update special stripe secret 
   console.log('The Secret is',clientSecret)
    const handleSubmit = async (event)=>{
        //do all the stripe steps4
        event.preventDefault();
        setProcessing(true);
        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent=payment confirmation
            db.collection('users')
            .doc(user?.uid) //this is using nosql data structure
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                 amount: paymentIntent.amount,
                 created: paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate('/orders',{replace:true});
        })

    }
    const handleChange=event=>{
          //Listen for changes in the card element
          //and display any errors as the customer types their card details
            setDisabled(event.empty);
            setError(event.error ? event.error.message : "");
        }
  return (
    <div className='payment'>
        <div className='payment-container'>
            <h1>
                Checkout (
                    <Link to="/Checkout">{basket?.length} items</Link>
                )
            </h1>
            {/* payement section-delivery address */}
               <div className='payment-section'>
                   <div className='payment-title'>
                    <h3>Delivery Address</h3>
                   </div>
                   <div className='payment-address'>
                    <p>{user?.email}</p>
                    <p>123 Lime Road</p>
                    <p>NewYork,CA</p>

                   </div>
               </div>
            {/* payment section-review Items */}
            <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment-items'>
                    {basket.map(item=>(
                    <CheckoutProduct id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}/>
                    ))}
                </div>
                </div>

            {/* payment section -Payment method */}
            <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment-details'>
                    {/* stripe magic will go here */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment-price-container'>
                        <CurrencyFormat renderText={(value)=>(
        <>
        <p>Subtotal ({basket?.length} items : <strong>{value}</strong>)</p>
        <small className="subtotal-gift">
            <input type="checkbox"/> This order contains a gift
        </small>
        </>
       )}
       decimalScale={2}
       value={getBasketTotal(basket)}
       displayType={"text"}
       thousandSeparator={true}
       prefx={"$"}
       
       />
       <button disabled={processing || disabled || succeeded}>
        <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
       </button>

                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
                </div>
        </div>

    </div>
  )
}

export default Payment