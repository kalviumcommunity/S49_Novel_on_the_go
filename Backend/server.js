
const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app =express();
const port= 3000;
const cors=require('cors')
let BookModel=require("./models/books.js")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function Connection(){
  await mongoose.connect(process.env.MONGODATA_URI);
  console.log("Connected to DB")
}

app.get("/",(req,res)=>{
   res.send("Working")
})
app.get('/books', async (req, res) => {
try {
const books = await BookModel.find();
console.log('Get Books:', books);
res.json(books);
} catch (err) {
console.error('Error retrieving books:', err);
res.status(500).json({ error: 'Internal Server Error' });
}
});
Connection().then(()=>{
app.listen(port, () => {
console.log("Hello, let's read some books");
});
})


module.exports = app;