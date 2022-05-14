const express = require('express')

const app = express()

// Template Engine
app.set('view engine', 'ejs')


app.route('/')
    .get((req,res)=> res.render("Home"))
    .post((req,res)=> {
        res.redirect('/status')
    })

app.route('/status')
    .get((req,res)=> res.render('Status'))    

app.route('/admin')
    .get((req,res)=> res.render('Admin-Panel-Hospital')) 
    
app.route('/confirmation')
    .get((req,res)=> res.render('Confirmation'))

app.route('/donor')
    .get((req,res)=> res.render('Donor-Hospital-List'))
    .post((req,res)=> res.redirect('/donor'))

app.route('/check')
    .get((req,res)=> res.render('Donor-Hospital-Form'))

// XXXXXXXXXXXXXXXXXXXXX
// DON'T TOUCH THE CODE BELOW THIS
// XXXXXXXXXXXXXXXXXXXXX

app.route('*')
    .get((req,res)=> res.render('Error'))

module.exports = app;