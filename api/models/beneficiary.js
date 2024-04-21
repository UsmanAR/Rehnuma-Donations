const mongoose = require("mongoose")

const beneficiarySchema = new  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },

    name:{
        firstName:{
            type:String,
            required:true
        },
        middleName:{
            type:String,
        },
        lastName:{
            type:String,
            required:true
        },
    },
    image:{
        type:String,
    },
    mobileNumber : {
        type:String,
        unique:true,
        required: true,
    },
    alternateMobileNumber : {
        type:String,
    },
    collegeName : {
        type:String,
        required: true
    },
    field:{
        type:String,
        enum:['Medical','Engineering'],
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    address:{
        landmark : {
            type:String
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        }
    },
    donationStatus:{
        totalAmount:{
            type:Number,
            required:true
        },
        amountPending:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum: ['Pending','Completed'],
            required:true
        }
    },

    Documents:{
        
    },
    selectionStatus:{
        type:String,
        enum:['Under Review','Accepted','Rejected'],
        required:true,
        default:'Under Review'
    }
   
},{timestamps:true})

const Beneficiary = mongoose.model("Beneficiary",beneficiarySchema);

module.exports =Beneficiary;