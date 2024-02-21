const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODATA_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async (req, res, next) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    req.dbClient = client;
    next();
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ "error": "Server Error" });
  }
};

const closeDB = async (req, res, next) => {
  try {
    if (client.isConnected()) {
      await client.close();
    }
    next();
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ "error": "Server Error" });
  }
};

router.post('/create', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(201).json({ "success": "created" });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ "error": "Server Error" });
  }
  finally {
    await closeDB(req, res);
  }
});
router.delete('/delete', connectDB, async (req, res) => {
    try {
      const { dbClient } = req;
      res.status(200).json({ "success": "data deleted" });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ "error": "Server Error" });
    } finally {
        await closeDB(req, res);
      }
  });

router.get('/read', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(200).json({ "success": "data read" });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ "error": "Server Error" });
  } finally {
    await closeDB(req, res);
  }
});

router.put('/update', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(200).json({ "success": "data updated" });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ "error": "Server Error" });
  } finally {
    await closeDB(req, res);
  }
});



module.exports = router;                                                                                                                                          