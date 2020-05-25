require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const unknownEndPoint = require('./middleware/unknownRouteHandler');

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/', (req, res) => {
  res.send('<h1>This is Phonebook rest api</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people.map((person) => person.toJSON()));
  });
});

app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    res.send(
      `<h3>Phonebook has info for ${
        people.length
      } people</h3><h3>${new Date()}</h3>`
    );
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'name or number is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON());
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const person = {
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatePerson) => {
      response.json(updatePerson.toJSON());
    })
    .catch((error) => next(error));
});
app.use(unknownEndPoint);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on this port ${PORT}`);
});
