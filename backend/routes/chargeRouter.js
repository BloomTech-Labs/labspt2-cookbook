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

});

router.post("/", (req, res)=>{
    const customer = req.body.customer

    stripe.subscriptions.create({
        customer: customer,
        items: [{plan: 'plan_EtW1Z1LBDe3p19'}]
    })
    .then(response =>{
        res.json(response)
        
    })
    .catch(err=>{
        console.log(err)
    })
});


module.exports = router;
