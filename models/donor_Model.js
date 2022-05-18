const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const donor_model = new Schema({
  d_id: {type: String},
  name: {type: String},
  bloodGroup: {type: String},
  phone: {type: Number},
  age: {type: Number},
  pincode: {type: Number},
  status: {type: Boolean}
})

const Donor = mongoose.model('donor', donor_model)

module.exports = Donor;
