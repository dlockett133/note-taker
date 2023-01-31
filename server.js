const express = require("express");
// const api = require(`./routes/index.js`)
const notes = require(`./db/db.json`)
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

// Route for a GET request that will return homepage (index.html)
app.get('*', (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/index.html`)
})
// Route for a GET request that will return JSON
app.get(`/api/notes/`, (req,res) => {
    res.status(200).json(notes);
})


app.listen(PORT, () =>{
    console.log(`Serving static asset routes at http://localhost:${PORT}`)
})