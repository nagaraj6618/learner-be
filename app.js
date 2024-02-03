const express = require('express')
const PORT = 8000
const app = express();

app.get('/',(req,res) => {

   res.status(200).json({message : "Server Working"})
})


app.listen(PORT,() => console.log(`Server Running at http://localhost:${PORT}`))