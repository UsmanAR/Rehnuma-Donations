const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email:  {
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber : {
        type:String,
        required: true,
    },
    alternateMobileNumber : {
        type:String,
    },
    donationAmount:{
        donatedTo:{
            type:Array,
        },
        totalAmountDonated:{
            type:String,
        }
    },
    verified: {
        type: Boolean,
        default: false,
      },
    verificationToken: String,

})

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor