const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    name: 'Arto Hellas',
    number: 67890000,
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: 34567567,
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: 123432343,
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: 67898789,
    id: 4,
  },
  {
    name: 'John',
    number: 56757787,
    id: 5,
  },
];
app.get('/', (req, res) => {
  res.send('<h1>This is Phonebook rest api</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(
    `<h3>Phonebook has info for ${
      persons.length
    } people</h3><h3>${new Date()}</h3>`
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generatedId = () => Math.floor(Math.random() * 100000 + 5);

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'name or number is missing',
    });
  }
  personExists = persons.some((person) => person.name === body.name);
  if (!personExists) {
    const person = {
      name: body.name,
      number: body.number,
      id: generatedId(),
    };
    persons = persons.concat(person);
    response.json(person);
  } else {
    response.status(409).json({ error: 'name must be unique' });
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on this port ${PORT}`);
