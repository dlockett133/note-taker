const express = require("express");
// const api = require(`./routes/index.js`)
const app = express()

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use('api', api)

app.use(express.static("./public/"));

const PORT = process.env.PORT || 3001;

// Route for a GET request that will return homepage
app.get(`/notes/`, (req,res) => {
    res.status(200).sendFile(`${__dirname}/public/notes.html`);
})


app.listen(PORT, () =>{
    console.log(`Serving static asset routes at http://localhost:${PORT}`)
})