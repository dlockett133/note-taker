const express = require("express");

const app = express()

app.use(express.static("./public/"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3001;