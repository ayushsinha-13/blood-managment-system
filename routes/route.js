const express = require('express')
const  https = require('https')

const app = express()

// Template Engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.route('/')
    .get((req,res)=> res.render("Home"))

app.route('/status')
    .get((req,res) => res.render('Status'))

app.route('/admin-login')
    .get((req,res)=> res.render('Admin-Login'))
    .post((req,res)=> res.redirect('/admin-hospital'))


// ADMIN PANEL
 app.route('/admin-hospital')
    .get((req,res) => res.render('Admin-Panel-Hospital'))
 app.route('/admin-donor')
    .get((req,res) => res.render('Admin-Panel-Donor'))
 app.route('/admin-recipient')
    .get((req,res) => res.render('Admin-Panel-Recipient'))
 app.route('/admin-appointment')
    .get((req,res) => res.render('Admin-Panel-Appointment'))


app.route('/confirmation')
    .get((req,res)=> res.render('Confirmation'))

// DONOR

app.route('/donor')
  .get((req,res)=> res.redirect('/'))
  .post((req,res)=>{
        const pincode = req.body.pincode
        res.render('Donor-Hospital-List', {pincode: pincode})
  })
app.route('/donor-form')
  .get((req,res)=> res.render('Donor-Hospital-Form'))
  .post((req,res)=> res.render('Confirmation'))

// RECIPIENT

app.route('/recipient')
  .get((req,res)=> res.redirect('/'))
  .post((req,res)=>{
    const blood = req.body.bloodGroup
    res.render('Recipient-Hospital-List', {blood: blood})
  })
app.route('/recipient-form')
.get((req,res)=> res.render('Recipient-Hospital-Form'))
.post((req,res)=> res.render('Confirmation'))


// XXXXXXXXXXXXXXXXXXXXX
// DON'T TOUCH THE CODE BELOW THIS
// XXXXXXXXXXXXXXXXXXXXX

app.route('*')
    .get((req,res)=> res.render('Error'))

module.exports = app;
