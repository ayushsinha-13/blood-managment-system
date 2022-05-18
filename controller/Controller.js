const uniqid = require('uniqid')
const Donor = require('../models/donor_Model');
const Recipient = require('../models/recipient_Model');
const Hospital = require('../models/hospital');


//
//  DONOR
//

create_donor = async(req,res)=>{
  const hospital_ID = req.body.hID
  const name = req.body.name
  const age = req.body.age
  const bloodGroup = req.body.bloodGroup
  const pincode = req.body.pincode
  const phone = req.body.phone
  const id = uniqid.time('DO')

  const hos = Hospital.find({h_id: hospital_ID}, async(err,found)=>{
    if(bloodGroup === "Ap"){
      let count = found[0].Ap + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Ap: count})
    }else if(bloodGroup === "An"){
      let count = found[0].An + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {An: count})
    }else if(bloodGroup === "Bp"){
      let count = found[0].Bp + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Bp: count})
    }else if(bloodGroup === "Bn"){
      let count = found[0].Bn + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Bn: count})
    }else if(bloodGroup === "ABp"){
      let count = found[0].ABp + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {ABp: count})
    }else if(bloodGroup === "ABn"){
      let count = found[0].ABn + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {ABn: count})
    }else if(bloodGroup === "Op"){
      let count = found[0].Op + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Op: count})
    }else if(bloodGroup === "On"){
      let count = found[0].Op + 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {On: count})
    }
  })

  const newDonor = new Donor({
    d_id: id,
      name: name,
      age: age,
      bloodGroup: bloodGroup,
      pincode: pincode,
      phone: phone,
      status: true
  })

  newDonor.save((err)=>{
          if(!err){
              return res.render('Confirmation',{ID: id});
          }else{
              console.log(err);
              return res.redirect("/");
          }
      });
}

get_donor = async(req,res)=>{
    Donor.find({}, (err, found)=>{
        res.render('Admin-Panel-Donor', {Donor: found})
    })
}
get_donor_form = async(req,res)=>{
  const hospital_ID = req.body.hID
  await Hospital.find({h_id: hospital_ID}, (err,found)=>{
    res.render('Donor-Hospital-Form', {Hospital: found})
  })
}


//
//  RECIPIENT
//

create_recipient = async(req,res)=>{
  const hospital_ID = req.body.hID
  const name = req.body.name
  const bloodGroup = req.body.bloodGroup
  const pincode = req.body.pincode
  const phone = req.body.phone
  const hospitalPincode = req.body.hospital_pincode
  const id = uniqid.time('DO')

  Hospital.find({h_id: hospital_ID}, async(err,found)=>{
    if(bloodGroup === "Ap"){
      let count = found[0].Ap - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Ap: count})
    }else if(bloodGroup === "An"){
      let count = found[0].An - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {An: count})
    }else if(bloodGroup === "Bp"){
      let count = found[0].Bp - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Bp: count})
    }else if(bloodGroup === "Bn"){
      let count = found[0].Bn - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Bn: count})
    }else if(bloodGroup === "ABp"){
      let count = found[0].ABp - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {ABp: count})
    }else if(bloodGroup === "ABn"){
      let count = found[0].ABn - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {ABn: count})
    }else if(bloodGroup === "Op"){
      let count = found[0].Op - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {Op: count})
    }else if(bloodGroup === "On"){
      let count = found[0].Op - 1;
      await Hospital.findOneAndUpdate({h_id: hospital_ID}, {On: count})
    }
  })

const newRecipient = new Recipient({
      r_id: id,
      name: name,
      hospital_ID: hospital_ID,
      bloodGroup: bloodGroup,
      pincode: pincode,
      status: false,
      phone: phone
  })


  await newRecipient.save((err)=>{
          if(!err){
              return res.render('Confirmation',{ID: id});
          }else{
              console.log(err);
              return res.redirect("/");
          }
      });
}

get_recipient = async(req,res)=>{
    await Recipient.find({}, (err, found)=>{
      console.log(found)
        res.render('Admin-Panel-Recipient', {Recipient: found})
    })
}


//
//  STATUS
//
get_status = async(req,res)=>{
  const id = req.body.id
  await Recipient.find({r_id: id}, async(err, foundRecipient)=>{
    console.log("Res = " + foundRecipient)
      const hospital_ID = foundRecipient[0].hospital_ID
      await Hospital.find({h_id: hospital_ID}, (err, foundHospital)=>{
        if(err){console.log("Error hai");}
        console.log("Hos = " + foundHospital)
        res.render('Status', {Recipient: foundRecipient, Hospital: foundHospital})
      })
  })
}

//
//  HOSPITAL
//

create_hospital = async(req,res)=>{
  const name = req.body.name
  const address = req.body.address
  const pincode = req.body.pincode
  const id = uniqid.time()

  const newHospital = new Hospital({
    h_id: id,
    name: name,
    address: address,
    pincode: pincode,
    rating: 5,
    Ap: 0,
    An: 0,
    Bp: 0,
    Bn: 0,
    ABp: 0,
    ABn: 0,
    Op: 0,
    On: 0
  })

  newHospital.save((err)=>{
    if(!err){
      res.redirect('/admin-hospital')
    }
  })
}
get_hospital_pincode = async(req,res)=>{
  const pincode = req.body.pincode
  await Hospital.find({pincode: pincode}, (err, found)=>{
    if(!err){
      console.log(found)
      res.render('Donor-Hospital-List', {Hospital: found, Pincode: pincode})
    }else{
      console.log(err)
      res.render('Error')
    }
  })
}
get_hospital_blood = async(req,res)=>{
  let blood = req.body.bloodGroup
  const userBlood = blood
  if(blood === "A+"){
    blood = "Ap"
  }else if(blood === "A-") {
    blood = "An"
  }else if(blood === "B+") {
    blood = "Bp"
  }else if(blood === "B-") {
    blood = "Bn"
  }else if(blood === "AB+") {
    blood = "ABp"
  }else if(blood === "AB-") {
    blood = "ABn"
  }else if(blood === "O+") {
    blood = "Op"
  }else if(blood === "O-") {
    blood = "On"
  }

  console.log("Hello");
  console.log(blood);
  await Hospital.find({bloodGroup: blood}, async (err, found)=>{
    if(!err){
      console.log(found)
      await res.render('Recipient-Hospital-List', {Hospital: found, Blood: userBlood})
    }else{
      console.log(err)
      res.render('Error')
    }
  })
}
get_hospital = async(req,res)=>{
  await Hospital.find({}, (err, found)=>{
    if(!err){
      console.log(found.bloodgroup)
      res.render('Admin-Panel-Hospital', {Hospital: found})
    }else{
      console.log(err)
      res.render('Error')
    }
  })
}
get_hospital_ID = async(req,res)=> {
  const hospital_ID = req.body.hID
  await Hospital.find({h_id: hospital_ID}, (err,found)=>{
    res.render('Recipient-Hospital-Form', {Hospital: found})
  })
}

//
//  ADMIN
//
authenticate_admin = (req,res)=>{
  const username = req.body.username
  const password = req.body.password
  if(username === "Admin@2022"){
    if(password === "getdata@2022"){
      res.redirect('/admin-hospital')
    }else{
      res.redirect('/admin-login')
    }
  }else{
    res.redirect('/admin-login')
  }
}

get_details = async(req,res)=>{
  await Recipient.find({}, (err, found)=>{
    if(!err){
      console.log(found.bloodgroup)
      res.render('Admin-Panel-Appointment', {Recipient: found})
    }else{
      console.log(err)
      res.render('Error')
    }
  })
}
approve_request = async(req,res)=>{
  const id = req.body.rID
  console.log("id = " + id)
  const stat = true
  await Recipient.findOneAndUpdate({r_id: id}, {status: stat})
  res.redirect('/admin-appointment')
}



module.exports = {
  approve_request,
  authenticate_admin,
  get_status,
  create_donor,
  create_recipient,
  create_hospital,
  get_donor,
  get_donor_form,
  get_recipient,
  get_hospital,
  get_hospital_pincode,
  get_hospital_blood,
  get_hospital_ID,
  get_details
}
