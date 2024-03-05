const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require('cors');
const BookModel=require('./models/books.js')
const novelData = require('./models/input.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function Connection() {
  await mongoose.connect(process.env.MONGODATA_URI);
  console.log('connected to DB')

}
app.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find();
    console.log('Retrieved books:', books);
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

app.post("/createbooks", (req, res) => {
  novelData.create(req.body)
    .then(input => res.json(input))
    .catch(err => res.json(err));
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
