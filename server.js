require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.static("public"));

const routes = require('./routes/route')
app.use(routes)

app.listen(3000,()=> console.log("Server started") )