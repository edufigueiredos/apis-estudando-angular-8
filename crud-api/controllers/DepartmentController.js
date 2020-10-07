const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Product = require('../models/Product')

router.get('/', (req, res) => {
    Department.find().exec((error, departments) => {
        if (error) res.status(500).send(error)
        else res.status(200).send(departments)
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    const department = new Department({
        name: req.body.name
    });
    department.save((error, departmentSave) => {
        if (error) res.status(500).send(error)
        else res.status(200).send(departmentSave)
    })
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.find({ departments: id }).exec();
        if (products.length) {
            res.status(500).send({
                message: 'Could not remove this department. You may have to fix its dependencies before'
            })
        } else {
            await Department.deleteOne({ _id: id });
            res.status(200).send({});
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Error.'})
    }
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Department.findById(id, (error, department) => {
        if (error) res.status(500).send(error);
        else if (!department) res.status(404).send({});
        else {
            department.name = req.body.name;
            department.save()
                .then((newDeparment) => res.status(200).send(newDeparment))
                .catch((err) => res.status(500).send(err));
        };
    })
})

module.exports = router;
