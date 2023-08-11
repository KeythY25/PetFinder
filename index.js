// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.static('public'))

//GET / returns homepage
app.get('/', (req, res, _next) => {
    //serve up the public folder as static index.html file
    res.sendFile(__dirname + '/index.html')
} )


// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// app.get('/api/query', (req, res, next) => {
//     const {query} = req.query
//     res.send(`Returning any test as a query- ${query}`)
// })

// app.get('/api/:string', (req, res, next) => {
//     const {string} = req.params
//     res.send(`Returning any test as a string- ${string}`)
// })

// app.get('/api/:string/query', (req, res, next) => {
//     const {query} = req.query
//     const {string} = req.params
//     res.send(`Returning any test as a string- ${string} with query - ${query}` )
// })

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
   
    const {owner} = req.query
    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send(pet)
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    console.log(req.params)
    const {name} = req.params

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet)

});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

module.exports = app;