const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require('cors');
const Joi = require('joi')
const BookModel=require('./models/books.js')
const { validateBooks, NovelData } = require('./models/input.js');
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
  try {
    const { error, value } = regFormSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password 
    });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
    res.cookie("jwt", accessToken);

    res.status(201).json({ success: true, message: 'Registration successful', userName: req.body.userName });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server errrrrror' });
  }
});

app.get('/login', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
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
  NovelData.find({})
  .then(input => res.json(input))
  .catch(err => res.json(err));
});
                                                                                                         

app.post("/createbooks", async (req, res) => {
  try {
    const { title, author, average_rating, userName } = req.body;
    const { error } = validateBooks({ title, author, average_rating, userName });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const book = await NovelData.create({ title, author, average_rating, userName });
    res.json(book);
  } catch (err) {
    console.error('Error creating books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updatebook/:id', (req,res) => {
  const id = req.params.id
  NovelData.findByIdAndUpdate({_id: id},{
    title: req.body.title, author: req.body.author, average_rating : req.body.average_rating})
  .then(usert => res.json(usert))
  .catch(err => res.json(err))
 })
 app.get('/getbook/:id',(req,res)=>{
  const id= req.params.id;
  NovelData.findById({_id:id})
  .then(usert => res.json(usert))
  .catch(err => res.json(err))
})
app.delete('/deletebooks/:id', (req, res) => {
  const id = req.params.id;
  NovelData.findByIdAndDelete({_id:id})
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
