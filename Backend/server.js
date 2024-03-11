const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require('cors');
const Joi = require('joi')
const BookModel=require('./models/books.js')
const novelData = require('./models/input.js');
const { validateBooks } = require('./models/validator.js');
const { regFormSchema, UserModel } = require('./models/login.js');
const cookieParser = require("cookie-parser");
const jwt =require('jsonwebtoken')

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function Connection() {
  await mongoose.connect(process.env.MONGODATA_URI);
  console.log('connected to DB')

}

app.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    // Validate request body against Joi schema
    const { error, value } = regFormSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }
    
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Create a new user using the UserModel
    const newUser = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password // Storing plain-text password
    });
    await newUser.save();

    // Generate JWT token
    const accessToken = jwt.sign({ userId: newUser._id }, { expiresIn: '10h' });

    // Set JWT token as a cookie
    res.cookie("jwt", accessToken);

    res.status(201).json({ success: true, message: 'Registration successful', userName: req.body.userName });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id }, { expiresIn: '10h' });

    // Set JWT token as a cookie
    res.cookie("jwt", accessToken);

    res.status(200).json({ success: true, message: 'Login successful', userName: user.userName });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find();
    // console.log('Retrieved books:', books);
    res.json(books);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/createbooks', (req, res) => {
  novelData.find({})
  .then(input => res.json(input))
  .catch(err => res.json(err));
});
                                                                                                         

app.post("/createbooks", async (req, res) => {
  try {
      const { error, value } = validateBooks(req.body);
      if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
      const book = await novelData.create(value);
      res.json(book);
  } catch (err) {
      console.error('Error creating books:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/updatebook/:id', (req,res) => {
  const id = req.params.id
  novelData.findByIdAndUpdate({_id: id},{
    title: req.body.title, author: req.body.author, average_rating : req.body.average_rating})
  .then(usert => res.json(usert))
  .catch(err => res.json(err))
 })
 app.get('/getbook/:id',(req,res)=>{
  const id= req.params.id;
  novelData.findById({_id:id})
  .then(usert => res.json(usert))
  .catch(err => res.json(err))
})
app.delete('/deletebooks/:id', (req, res) => {
  const id = req.params.id;
  novelData.findByIdAndDelete({_id:id})
    .then(deletedbook => res.json(deletedbook))
    .catch(err => res.json(err));
});
app.get("/", (req, res) => {
  res.send("Working");
});

Connection()
  .then(() => {
    app.listen(port, () => {
      console.log("Hello, let's read some books");
    });
  })
  .catch(error => {
    console.error('Error starting server:', error);
  });

module.exports = app;
