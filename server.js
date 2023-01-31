const express = require("express");
const fs = require("fs");
const util = require("util");
// const api = require(`./routes/index.js`)
const notes = require(`./db/db.json`);
const uuid = require("./helpers/uuid");
const app = express()

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use('api', api)

app.use(express.static("./public/"));

const PORT = process.env.PORT || 3001;

// Route for a GET request that will return notes.html
app.get(`/notes/`, (req,res) => {
    res.status(200).sendFile(`${__dirname}/public/notes.html`);
})

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


// Route for a GET request that will return JSON
app.get(`/api/notes`, (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.post(`/api/notes`, (req, res) => {
    console.log(`${req.method} is now logged =)`)
    const {title, text} =  req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteID: uuid()
        }
    
        // readAndAppend(newNote, './db/db.json')

    const response = {
        status: `success`,
        body: newNote
    };

        res.status(201).json(response)
        console.log(response)

    } else {
        res.status(500).json(`error in posting note`)
    }

})

// Route for a GET request that will return homepage (index.html)
app.get('*', (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/index.html`)
})

app.listen(PORT, () =>{
    console.log(`Serving static asset routes at http://localhost:${PORT}`)
})