
const express = require('express');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app =express();
const port= 3001;

app.use(express.json());

const uri = process.env.MONGODATA_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
;
app.get('/pin', (req, res)=>{
    res.send('pon');
});

const routes = require("./routes");

app.use("/", routes);
app.get("/", async (req, res) => {
    try {
      await client.connect();
      if (client.topology.isConnected()) {
        res.json({ message: "pong", database_status: "Connected" });
        console.log("y");
      } else {
        res.json({ message: "pong", database_status: "Disconnected" });
        console.log("n");
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Error" });
    }
  });
  
if(require.main==module){
    app.listen(port, ()=>{
        console.log("Hello, let's read some books");
    });
}

module.exports = app;