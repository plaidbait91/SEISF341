require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const hasher = require('password-hash');

const User = require('./models/user');
const app = express();

// connect to mongoDB atlas using mongoose
mongoose.connect( process.env.MONGODB_API_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// checking if the connection to MongoDB atlas was successful
const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("MongoDB Atlas Connection Successful");
  });

  // Basic endpoint of the backend
app.get('/',(req,res)=>{
	res.status(200).json({api:'version 1'});
});

app.get('/register', (req, res) => {
  var user = req.query.user;
  var pass = req.query.pass;

  var passHash = hasher.generate(pass);

  const newUser = new User({
    username: user,
    passwordHash: passHash,
    fullName: "John Doe"
  })

  newUser.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
})

// start the app on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port',PORT));
