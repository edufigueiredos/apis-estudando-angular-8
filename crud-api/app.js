const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const departmentController = require('./controllers/DepartmentController');
const productController = require('./controllers/ProductController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/crud_api',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/departments', departmentController);
app.use('/products', productController);

app.listen(3000);