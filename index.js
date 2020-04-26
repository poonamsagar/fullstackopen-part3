const express = require("express");
const app = express();

app.use(express.json());
 
let persons=[
    {
        name:"Arto Hellas",
        number: 67890000,
        id : 1
    },
    {
        name:"Ada Lovelace",
        number: 34567567,
        id: 2
    },
    {
        name:"Dan Abramov",
        number: 123432343,
        id:3
    },
    {
        name:"Mary Poppendieck",
        number: 67898789,
        id:4
    },
    {
    name:"John",
    number:56757787,
    id: 5
    },
];
app.get("/",(req,res)=>{
    res.send("<h1>This is Phonebook rest api</h1>");
});

app.get("/api/persons",(req,res)=>{
    res.json(persons);
});

app.get("/info",(req,res)=>{
    res.send(`<h3>Phonebook has info for ${persons.length} people</h3><h3>${new Date()}</h3>`);
});


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on this port ${PORT}`);