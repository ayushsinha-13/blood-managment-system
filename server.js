require('dotenv').config()
const express = require('express')

const app = express()

// Use Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT || 3000 ;

// Database connection
const connection = require('./database.js');

// Routes
const routes = require('./routes/route')
app.use(routes)

// Server Listen
connection.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
    // error in mondb connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});
