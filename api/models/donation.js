const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },

  donations:
    {
      name: {
        firstName: {
          type: String,
          required: true
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true
        },

      },
      image: {
        type: String,
      },
      mobileNumber: {
        type: String,
        unique: false,
      },
      alternateMobileNumber: {
        type: String,
        unique:false
      },
      collegeName: {
        type: String,
        required: true
      },
      address: {
        landmark: {
          type: String
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        }
      },
      donatedAmount: {
        type:Number,
        required:true,
     
      },

    }
},{timestamps:true});


const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;