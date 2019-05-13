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
            res.status(201).json(response)
        })
        .catch(err=>{
            res.status(500).json({error: "Could not create a new customer"})
        })

});

router.post("/", (req, res)=>{
    const customer = req.body.customer

    stripe.subscriptions.create({
        customer: customer,
        items: [{plan: 'plan_EtW1Z1LBDe3p19'}]
    })
    .then(response =>{
        res.status(201).json(response)
        
    })
    .catch(err=>{
        res.status(500).json({error: "Could not add subscription to customer"})
    })
});

router.put("/unsubscribe", (req, res) =>{
    const subscription = req.body.subscription

    stripe.subscriptions.update(subscription, {
        cancel_at_period_end: true
    })
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({error: "Could not update customers subscription"})
    })
}); 


module.exports = router;
