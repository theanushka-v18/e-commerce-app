const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hi welcome to this e-commerce app');
});

app.get('/product-detail', (req, res) => {
    res.send('hi this is a product-detail page of an e-commerce app')
})

app.get('/cart', (req, res) => {
    res.send('hi, all your products are added in the cart')
})

app.listen(4000, () => {
    console.log('server is running on port 4000');
});