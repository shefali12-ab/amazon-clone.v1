
import {useEffect} from "react";
import { BrowserRouter as  Router,Routes,Route,Link  } from 'react-router-dom';
import './App.css';
import Header from'./Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import { auth} from "./firebase";
import {useStateValue} from "./StateProvider"
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from "./Orders";
const promise =loadStripe('pk_test_51Nhn2bSGXZQNAbFMuNJ8OekmXlh2AcdgEDrix9o0VFdsFjkRhZJhV9IgrmkTiP4IWmWuyazlSidNQkJNtTjvKieG00FPuH3z54')

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is >>>', authUser);
      if(authUser){
        //the user just logged in /the user was logged in
         dispatch({
          type: 'SET_USER',
          user:authUser
         
         })
      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[] )
  
  return (
    <Router>
    <div className="App">
   
     <Routes>
      <Route path="/Orders" element={<Orders/>}/>
       <Route path="/Login" element={ <Login/>}/>
      <Route path="/Checkout" element={[<Header/>,<Checkout/>]}/>
      <Route path="/Payment" element={[<Header/>,<Elements stripe={promise}><Payment/></Elements>]}/>
      <Route path="/" element={[<Header/>,<Home/>]}/>
     </Routes>
    
    </div>
   
    </Router>
  );
}

export default App;
