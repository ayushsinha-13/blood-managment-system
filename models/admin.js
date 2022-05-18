const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const admin_model = new Schema({
    username : {type: String},
    password : {type: String}
})

const Admin = mongoose.model('admin', admin_model)

module.exports = Admin;
