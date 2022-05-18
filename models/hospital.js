const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const hospital_model = new Schema({
    h_id: {type: String},
    name: {type: String},
    address: {type: String},
    pincode: {type: Number},
    rating: {type: Number},
    Ap: Number,
    An: Number,
    Bp: Number,
    Bn: Number,
    ABp: Number,
    ABn: Number,
    Op: Number,
    On: Number
})

const Hospital = mongoose.model('hospital', hospital_model)

module.exports = Hospital;
