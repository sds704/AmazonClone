const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

require('dotenv').config()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log("server is running on 8000");
});

mongoose
  .connect("mongodb+srv://saurabhsingh:saurabh@cluster0.bxtr0u5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const User = require("./models/User");
const Order = require("./models/Order");

//endpoint to register a new user
app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // check if the email is already registered
      const existingUser = User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }
  
      //create a new user
      const newUser = new User({ name, email, password });
      // generate and store verification token
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
          "Registration successfull. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  });

  const sendVerificationEmail = async (email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
      service: "gmail",
      auth: {
        user: "saurabhsinghts7@gmail.com",
        pass: "gtmtsmvbxdaoikmx",
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

//endpoints to verify email
app.get("/verify/:token", async (req, res) => {
    try {
      const token = req.params.token;
  
      //Find the user with the given verification token
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

//endpoint to login
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //check if user exist
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      //check if password is correct
      if (user.password != password) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      // generate the token
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
  };
  
  const secretKey = generateSecretKey();

  //endpoint to store new address to backend
app.post("/addresses", async (req, res) => {
    try {
      const { userId, address } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
  
      user.addresses.push(address);
        await user.save();
  
      res.status(200).json({message:'Address created successfully'})
    } catch (error) {
      res.status(500).json({ message: "error adding address" });
    }
  });

  //endpoint to get all addresses of a user
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
app.post("/orders", async (req, res) => {
    try {
      const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
        req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //create an array of product objects from the cart Items
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
      }));
  
      //create a new Order
      const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      });
  
      await order.save();
  
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
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  });

  app.get("/orders/:userId",async(req,res) => {
    try{
      const userId = req.params.userId;
  
      const orders = await Order.find({user:userId}).populate("user");
  
      if(!orders || orders.length === 0){
        return res.status(404).json({message:"No orders found for this user"})
      }
  
      res.status(200).json({ orders });
    } catch(error){
      res.status(500).json({ message: "Error"});
    }
  })