import React, {useState} from 'react'
import './Login.css'
import {Link,useNavigate} from "react-router-dom"
import {auth} from "./firebase"
function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const signIn=e=>{
    e.preventDefault()
    //some fancy firebase login
    auth
        .signInWithEmailAndPassword(email,password)
        .then(auth =>{
             navigate('/')
        })
        .catch(error => alert(error.message))
  }
 
  const register =e =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth)=>{
      //it successfully created a new user with email and password
     // console.log(auth);
      if(auth){
        navigate('/')
      }
    }).catch(error=>alert(error.message))
      
    //some fancy firebase register
  }
  
  return (
    <div className='login'>
        <Link to="/">
        <img className="login-logo"src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
        </Link>
    <div className='login-container'>
        <h1>Sign-in</h1>
        <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
            <h5>Password</h5>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <button type='submit'onClick={signIn} className='login-sigin-btn'>Sign In</button>
        </form>
        <p>By signing-in you agree to  the AMAZON FAKE CLONE Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
        </p>
        <button onClick={register} className='login-register-btn'> Create your Amazon Account</button>
    </div>
    </div>
  )
}

export default Login