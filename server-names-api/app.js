const mongoose = require('mongoose');
const express = require('express')
const Person = require('./person.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/namesdb', { useNewUrlParser: true });

app.get('/', (req, res) => {
   Person.find({}).lean().exec((error, data) => {
      if (error) {
         return res.status(500).json({
            error: error,
            message: 'Internal error.'
         });
      };

      return res.status(200).json(data);
   });
});

app.get('/:text', (req, res) => {
   const text = req.params.text;
   const query = {
      $or: [
         { firstName: { $regex: text, $options: 'i' } },
         { lastName: { $regex: text, $options: 'i' } },
         { country: { $regex: text, $options: 'i' } },
         { email: { $regex: text, $options: 'i' } },
         { city: { $regex: text, $options: 'i' } }
      ]
   };

   Person.find(query).lean().exec((error, data) => {
      if (error) {
         return res.status(500).json({
            error: error,
            message: 'Internal error.'
         });
      };

      // return res.status(200).json(data);
      setTimeout(() => {
         return res.status(200).json(data);
      }, 2000);
   })
})

app.use((req, res, next) => {
   res.status(404).send('Route does not exist.');
});

app.listen(9000);
