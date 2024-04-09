const express = require('express');
const PORT = 8000;
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')
//import routes
const auth = require('./routes/auth.js');
const book = require('./routes/slotbook.js')


require('dotenv').config()

const corsOptions = {
   origin: true,
   credentials: true
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
 
   }
   catch (err) {
     console.log(err)
     console.log('Mongodb database Connection failed')
   }
 
 }

 //for verification
app.get('/',(req,res) => {
   res.status(200).json({message : "Server Working"})
})
app.get('/api/v1',(req,res) => {
  res.status(200).json({message : "Server Working..."})
})

//routes


app.use(express.json())

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/v1/auth',auth);
app.use('/api/v1/booking',book)

app.listen(PORT,() => { 
   console.log(`Server Running at http://localhost:${PORT}`)
   connect();
})

module.exports = app;