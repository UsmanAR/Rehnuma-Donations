const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

// Importing models
const Donor = require("./models/donors")
const Beneficiary = require("./models/beneficiary")
const User = require("./models/user");
const Donation = require("./models/donation");

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


const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "elcidtang@gmail.com",
      pass: "pxsaxwvrpbazmjlq"
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
  console.log('hii')
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//endpoint to store all the orders
app.post("/donations", async (req, res) => {


  try {
    const { userId,donationItem } =
      req.body;

 
      const Id =jwt.decode(userId)
      decodedId= Id.userId

    const user = await User.findById(decodedId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items


    // create a new Order
    const donation = new Donation({
      user: decodedId,
      donations:donationItem,
    });
    console.log(donation.donations)


    await donation.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const Id =jwt.decode(userId)
    decodedId= Id.userId

    const user = await User.findById(decodedId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/donations/:userId",async(req,res) => {
  try{
    const userId = req.params.userId;
    const Id =jwt.decode(userId)
    decodedId= Id.userId

    const donation = await Donation.find({user:decodedId}).populate("user");
    console.log(donation)

    if(!donation || donation.length === 0){
      return res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ donation });
  } catch(error){
    res.status(500).json({ message: "Error"});
  }
})

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
