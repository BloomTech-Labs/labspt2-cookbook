const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_3ZUAoctaVhxGLXcxNxxph9so00dFNf9TlQ");


router.post("/user", async (req, res) => {
    const token = req.body.id

    await stripe.customers.create({
            email: req.body.card.name,
            source: token,
        })
        .then(response =>{
            res.json(response)
        })
        .catch(err=>{
            console.log(err)
        })




    // stripe.subscriptions.create({
    //     customer: 'cus_4fdAW5ftNQow1a',
    //     items: [{plan: 'plan_CBXbz9i7AIOTzr'}],
    // });
    
});


module.exports = router;

// await stripe.charges.create({
//     amount: 1000,
//     currency: "usd",
//     description: "Subscription to Kookr",
//     source: token

// await stripe.plans.create({
//     amount: 1000,
//     currency: 'usd',
//     interval: 'month',
//     nickname: 'Pro Plan',
//     product: 'prod_EtVvKM8DFLmojT',
// })
// .then( status =>{
//     res.json(status)

// })
// .catch(err =>{
//     res.json({"error": err}).end();
// })