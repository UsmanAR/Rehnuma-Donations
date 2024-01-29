const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

// Importing models

const Donor = require("./models/donors")
const Beneficiary = require("./models/beneficiary")

const app =express()
const port = 8000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.listen(port, () => {
    console.log("Server is running on port 8000");
  });

mongoose.connect("mongodb://localhost:27017/Rehnuma", {

}).then(() => {
    console.log("connected to Mongodb")
}).catch((err) => {
    console.log("error connecting to Mongodb", err)

})

//Function to generate secret key for JWT token
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();


//function to send verificationEmail to user

const sendVerificationEmail = async(email, verificationToken) => {
  // create a nodemailer transport

  const transpoter = nodemailer.createTransport({
      // configuer the mail service
      service: "gmail",
      port:465,
      secure:true,
      host: 'smtp.gmail.com',
      auth: {
          user: "elcidtang@gmail.com",
          pass: "pxsaxwvrpbazmjlq"
      }
  })

  //compose the email message
  const mailOptions = {
      from: "amazon.com",
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
    };
  
  //send Email
  try {
      console.log("here")
      await transpoter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
}

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const Id =jwt.decode(userId)
    decodedId= Id.userId
   
    const user = await Donor.findById(decodedId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});


// ENDPOINT TO REGISTER   
app.post("/register", async (req, res) => {
  
  try {
      const { name, email,password,mobileNumber } = req.body;

      //check if emails is already registerd
      const existingUser = await Donor.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ messsage: "Email Already Registered" })
      }

      //create New User
      const newDonor = new Donor({ name, email, password,mobileNumber });

      //generate and store the verification token

      newDonor.verificationToken = crypto.randomBytes(20).toString("hex");

      //save the user to the database

      await newDonor.save();

         // Debugging statement to verify data
  console.log("New User Registered:", newDonor);

      //send Verification mail to user

      sendVerificationEmail(newDonor.email, newDonor.verificationToken);
      res.status(201).json({
          message:
            "Registration successful. Please check your email for verification.",
        });


  } catch (err) {
      console.log("error registering user", err)
      res.status(500).json({ messsage: "Ragistraion Failed" })
  }
})


//Endpoint for verification

app.get("/verify/:token", async (req, res) => {
  try{
      const token = req.params.token;

      //find user with given verification token

      const user = await Donor.findOne({ verificationToken: token });
      if(!user){
          return res.status(404).json({message:"Invalid Verification Token"})
      }

      //mark user as verified
      user.verified = true;
      user.verificationToken= undefined;

      await user.save();

      res.status(200).json({message:"Email Verified Successfully"})

  }catch(error){
      res.status(500).json({message:"Email Verification Failed"})
  }
})



// enpoint to login 
app.post("/login", async (req, res) => {
    
    try {
      const { email, password } = req.body;
  
      //check if the user exists
      console.log("The email is " + email)
      const user = await Donor.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      console.log("USer id is "  + user._id)
      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
      console.log("After")
      res.status(200).json({ message:"Logged In Successfully",token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed",Error : error.message });
    }
  });

  //get the Donor profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const Id =jwt.decode(userId)
    decodedId= Id.userId
   
    const user = await Donor.findById(decodedId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

// Get students List

app.get("/students",async (req,res)=>{
    try{
      const beneficiaries = await Beneficiary.find({});
        if(beneficiaries==""){
          res.status(200).json({
            message:"No students found"
          })
        }
        else{
          res.status(200).json({
            beneficiaries
          });

        }
      }
    catch(error){
      res.status(500).json({
        errorMessage:error.message
      });
    }
})

// ENDPOINT TO ADD STUDENTS 

app.post("/students" , async (req,res) =>{
  try{
      const {
        name,
        mobileNumber,
        alternateMobileNumber,
        collegeName,
        address,
        donationStatus,
        field
      } = req.body;
      const newBeneficiary = new Beneficiary({
        name,
        mobileNumber,
        alternateMobileNumber,
        collegeName,
        address,
        donationStatus,
        field
      })
      await newBeneficiary.save();
      res.status(200).json({
        message:"Data inserted successfully"
      })
  }
  catch(error){
    res.status(500).json({
      Error:error.message
    })
  }
})

// ENDPOINT TO DONATE TO STUDENT

app.post("/donate", async (req,res)=>{
    try{
  //const studentId = req.params.studentId;
  const stud_id = "65a4022d0837a10b910e9314";
  const studentId = {
    _id:stud_id
  };
  const amountDonated = req.body.amountDonated;
  const student =await Beneficiary.findById(studentId);
  const newTotalAmount = student.donationStatus.totalAmount;
  const amountPending = student.donationStatus.amountPending;
  if(amountDonated>amountPending){
    res.status(200).json({
      message:"Donation amount exceeding the pending amount"
    })
  }
  else{
    const newPendingAmount = amountPending - Number(amountDonated);
    console.log("Types of data types - " + typeof(amountPending) + " " + " "+ typeof(newTotalAmount) )
    var newDonationStatus;
    if(newPendingAmount <= 0){
       newDonationStatus = "Completed"
    }else {
       newDonationStatus = "Pending"
    }
    const updatedStudent =await Beneficiary.findByIdAndUpdate(stud_id,{
        donationStatus:{
          totalAmount:newTotalAmount,
          amountPending:newPendingAmount,
          status : newDonationStatus
      }  
    }
    )
    updatedStudent.save();
  res.status(200).json({
    message:"Amount donated to student successfully"
  })
  }
}
catch(error){
  res.status(500).json({
    Error:error.message
  })
}
})


// endpoint to clear beneficiaries collection 

app.get("/donate" , async (req,res) =>{
  try{

    await Beneficiary.deleteMany();
    res.status(200).json({
      message:"Beneiciaries collection cleared"
    })
  }
  catch(error){
    res.status(500).json({
      Error:error.message
    })
  }

})