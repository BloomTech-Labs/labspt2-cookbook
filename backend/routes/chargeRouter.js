const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_3ZUAoctaVhxGLXcxNxxph9so00dFNf9TlQ");


router.post("/", async (req, res) => {
    const token = req.body.id
    console.log(req.body.id)

    await stripe.charges.create({
        amount: 1000,
        currency: "usd",
        description: "Subscription to Kookr",
        source: token
    })
    .then( status =>{
        res.json(status)
    })
    .catch(err =>{
        res.json({"error": err}).end();
    })
    
});


module.exports = router;