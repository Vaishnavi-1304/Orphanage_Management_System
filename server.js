const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-from-stripe'); // Add your Stripe secret key here

const app = express();
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency,
                    product_data: {
                        name: 'Donation to Hopeful Hearts Orphanage',
                    },
                    unit_amount: amount * 100, // Stripe requires the amount in cents/paise
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'success.html', // Replace with your success page
            cancel_url: 'cancel.html',   // Replace with your cancel page
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve the donation form
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
