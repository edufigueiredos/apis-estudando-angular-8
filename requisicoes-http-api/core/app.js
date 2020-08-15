const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('../model/product');
const product = require('../model/product');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_client', { useNewUrlParser: true });

const myLogger = (req, res, next) => {
    console.log(req.body);
    next();
}

app.use(myLogger);

app.get('/products', (req, res) => {
    Product.find().lean().exec(
        (err, prods) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(prods);
        }
    );
});

app.get('/productserr', (req, res) => {
    setTimeout(() => {
        res.status(500).send({
            msg: 'Error message from the server'
        });
    }, 2000);
});

app.get('/productsdelay', (req, res) => {
    setTimeout(() => {
        Product.find().lean().exec(
            (err, prods) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prods);
            }
        );
    }, 2000);
});

app.get('/products/ids', (req, res) => {
    Product.find().lean().exec(
        (err, prods) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(prods.map(product => product._id));
        }
    );
});

app.get('/product/name/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, prod) => {
        if (err) {
            res.status(500).send(err);
        } else if(!prod) {
            res.status(404).send({});
        } else {
            res.status(200).send(prod.name);
        }
    });
});

app.post('/products', (req, res) => {
    const product = new Product({
        name: req.body.name,
        department: req.body.department,
        price: req.body.price
    });
    product.save((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    })
});

app.delete('/products/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    });
});

app.patch('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err)
            res.status(500).send(err);
        else if(!product)
            res.status(404).send({});
        else {
            product.name = req.body.name;
            product.price = req.body.price;
            product.department = req.body.department;

            product.save((err, prod) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prod);
            });
        }
    });
})

app.listen(3000);
