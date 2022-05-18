const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const recipient_model = new Schema({
  r_id: {type: String},
  name: {type: String},
  bloodGroup: {type: String},
  phone: {type: Number},
  hospital_ID: {type: String},
  pincode: {type: Number},
  status: {type: Boolean}
})

const Recipient = mongoose.model('recipient', recipient_model)

module.exports = Recipient;
