const express = require("express");
const fs = require("fs")
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

// Route for a GET request that will return JSON
app.get(`/api/notes/`, (req,res) => {
    res.status(200).json(notes);
})

app.post(`/api/notes/`, (req, res) => {
    console.log(`${req.method} is now logged =)`)
    const {title, text} =  req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteID: uuid()
        }
    
    fs.readFile("./db/db.json", `utf-8`, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const parsedNotes = JSON.parse(data)
            parsedNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), (err) => {
                err ? console.log(err) : console.log(`New note entry is saved!`);  
            })
        }
    })

    const response = {
        status: `success`,
        body: newNote
    };

        res.status(201).json(response)
        console.log(response)

        // refresh the page after the API has been updated
        window.location.reload()

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