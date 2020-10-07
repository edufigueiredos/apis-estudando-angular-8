const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', (req, res) => {
    const { name, price, stock, departments } = req.body;
    const product = new Product({
        name,
        price,
        stock,
        departments,
    });
    product.save((error, product) => {
        if (error) res.status(500).send(error);
        else res.status(201).send(product);
    });
});

router.get('/', (req, res) => {
    Product.find().exec((error, products) => {
        if (error) res.status(500).send(error);
        else res.status(200).send(products);
    });
});

router.delete('/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (error) => {
        if (error) res.status(500).send(error);
        else res.status(200).send({});
    });
});

router.patch('/:id', (req, res) => {
    Product.findById(req.params.id, (error, product) => {
        if (error) res.status(500).send(error)
        else if (!product) res.status(404).send({})
        else {
            const { name, price, stock, departments } = req.body;
            product.name = name
            product.price = price
            product.stock = stock
            product.departments = departments
            product.save((error, prod) => {
                if (error) res.status(500).send(error);
                else res.status(200).send(prod);
            });
        }
    });
});

module.exports = router;