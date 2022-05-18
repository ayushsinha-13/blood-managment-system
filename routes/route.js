const express = require('express')
const  https = require('https')
const uniqid = require('uniqid')
const controller = require('../controller/Controller')

const app = express()

// Template Engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.route('/')
    .get((req,res)=> res.render("Home"))

app.route('/status')
    .post(controller.get_status)

app.route('/admin-login')
    .get((req,res)=> res.render('Admin-Login'))
    .post(controller.authenticate_admin)


// ADMIN PANEL
 app.route('/admin-hospital')
    .get(controller.get_hospital)
    .post(controller.create_hospital)
 app.route('/admin-donor')
    .get(controller.get_donor)
 app.route('/admin-recipient')
    .get(controller.get_recipient)
 app.route('/admin-appointment')
    .get(controller.get_details)
    .post(controller.approve_request)


// DONOR

app.route('/donor')
  .post(controller.get_hospital_pincode)
app.route('/donor-form')
  .post(controller.create_donor)
app.route('/donor-pincode')
  .post(controller.get_donor_form)

// RECIPIENT

app.route('/recipient')
  .post(controller.get_hospital_blood)
app.route('/recipient-form')
  .post(controller.create_recipient)
app.route('/recipient-hospital')
  .post(controller.get_hospital_ID)


// XXXXXXXXXXXXXXXXXXXXX
// DON'T TOUCH THE CODE BELOW THIS
// XXXXXXXXXXXXXXXXXXXXX

app.route('*')
    .get((req,res)=> res.render('Error'))

module.exports = app;
