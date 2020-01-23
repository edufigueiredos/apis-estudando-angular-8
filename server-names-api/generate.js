const mongoose = require('mongoose');
const faker = require('faker');
const Person = require('./person.js');

mongoose.connect('mongodb://localhost:27017/namesdb', { useNewUrlParser: true });

async function createRandomPeople() {
   const numberOfPeople = 1000;
   for (let index = 0; index < numberOfPeople; index++) {
      const person = new Person({
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         email: faker.internet.email(),
         city: faker.address.city(),
         country: faker.address.country()
      });
      try {
         await person.save();
      } catch(error) {
         throw new Error('Error generating new person');
      }
   }
}

createRandomPeople().then(() => {
   mongoose.disconnect();
   console.log('Ok');
});