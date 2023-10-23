/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions=require("firebase-functions");
const express= require("express");
const cors =require("cors");
const stripe= require("stripe")
//("sk_test_51Nhn2bSGXZQNAbFMs53GJADMstSCJ1zvIBY0i55u6R67aAdjjpC8dntNiQA7SXHOlTknu6Fd5UPipP78zVKk6Dsd00u9mq7CMj")
stripe.api_key="sk_test_51Nhn2bSGXZQNAbFMs53GJADMstSCJ1zvIBY0i55u6R67aAdjjpC8dntNiQA7SXHOlTknu6Fd5UPipP78zVKk6Dsd00u9mq7CMj"
//API



//app config

const app= express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());




//API routes
app.get("/",(request,response)=> response.status(200).send('hello world'));

app.post("/payments/create",async(request,response)=>{
    const total= request.query.total;
    console.log('Payment Request Received',total)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//subunits of the currency
        currency:"usd",
        // payment_method_types:"card",
    });
    //ok-created
    console.log("I am here")
    response.status(201).send({
        
        clientSecret: paymentIntent.client_secret,
    });
});


//Listen command
exports.api=functions.http.onRequest(app)

//Example endpoint
//http://127.0.0.1:5001/clone-2b72f/us-central1/api


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
