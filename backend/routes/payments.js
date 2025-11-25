const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const paypal = require('paypal-rest-sdk');
const dotenv = require("dotenv");

dotenv.config();

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
});

// Stripe: create payment intent
router.post('/stripe/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency='usd' } = req.body;
    if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ message: 'Stripe not configured' });
    const pi = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PayPal: create payment (simple example)
router.post('/paypal/create', (req, res) => {
  const { amount } = req.body;
  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{ amount: { total: (amount/100).toFixed(2), currency: "USD" }, description: "Concert ticket" }],
    redirect_urls: { return_url: "https://example.com/success", cancel_url: "https://example.com/cancel" }
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) { console.error(error); return res.status(500).json({ message: error.response }); }
    res.json(payment);
  });
});

// GCash: placeholder endpoint (GCash integration requires GCash Partner APIs + keys)
router.post('/gcash/create', (req, res) => {
  // NOTE: This is a placeholder. To integrate GCash you must register as a partner, obtain credentials and follow their API docs.
  res.status(501).json({ message: 'GCash integration placeholder. Add partner credentials and implementation.' });
});

module.exports = router;
