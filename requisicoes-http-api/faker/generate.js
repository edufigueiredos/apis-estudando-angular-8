const mongoose = require('mongoose');
const Product = require('../model/product');
const Faker = require('faker');

mongoose.connect('mongodb://localhost:27017/http_client', { useNewUrlParser: true });

async function generateProduct() {
    for (let index = 0; index < 10; index++) {
        const product = new Product({
            name: Faker.commerce.productName(),
            department: Faker.commerce.department(),
            price: Faker.commerce.price()
        });

        try {
            await product.save();
        } catch (err) {
            throw new Error('Error generating products');
        }
    }
}

generateProduct().then(() => {
    mongoose.disconnect();
    console.log('Ok');
})
