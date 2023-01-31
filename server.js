const express = require("express");
const api = require(`./routes/index.js`)
const app = express()

app.use(express.static("./public/"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('api', api)
const PORT = process.env.PORT || 3001;

// Route for a GET request that will return homepage
app.get(`/`, (req,res) => {
    res.status(200).sendFile(`${__dirname}/public`);
})

app.listen(PORT, () =>{
    console.log(`Serving static asset routes at http://localhost:${PORT}`)
})