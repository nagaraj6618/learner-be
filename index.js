const express = require('express');
const PORT = 8000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
//import routes
const auth = require('./routes/auth.js');
const book = require('./routes/slotbook.js')

let dbChecking = "Not connected"
require('dotenv').config()

const corsOptions = {
  origin: true,
  credentials: true,
 }

//databse Connection
mongoose.set('strictQuery',false)
const connect = async () => {
   try {
     await mongoose.connect(process.env.MONGO_DB_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
     })
     console.log("MongoDb databse connected")
     dbChecking = "connected DB";
   }
   catch (err) {
     console.log(err)
     console.log('Mongodb database Connection failed')
     dbChecking = "Failed";
   }
 
 }

 //for verification
app.get('/',(req,res) => {
   res.status(200).json({message : "Server Working"})
})
app.get('/api/v1',(req,res) => {
  res.status(200).json({message : "Server Working..."})
})
app.get('/api/v1/db',(req,res) => {
  res.status(200).json({message:dbChecking})
})
//routes

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/auth',auth);
app.use('/api/v1/booking',book)
connect();
app.listen(PORT,() => { 
   console.log(`Server Running at http://localhost:${PORT}`)
   
})

module.exports = app;