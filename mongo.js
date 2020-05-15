const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://poonam:${password}@cluster0-95by0.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];

const number = process.argv[4];

const person = new Person({
  name,
  number,
});

if (name && number) {
  person.save().then((person) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((people) => {
    console.log('phonebook:');
    people.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
