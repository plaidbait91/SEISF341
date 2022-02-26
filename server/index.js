require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const hasher = require('password-hash');

const Answer = require('./models/answer');
const Question = require('./models/question');
const _ = require('./models/user');
const User = _.User

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

app.use(express.json())

  // Basic endpoint of the backend
app.get('/',(req,res)=>{
	res.status(200).json({api:'version 1'});
});

app.post('/register', (req, res) => {
  let body = req.body
  body.password = hasher.generate(body.password)

  const newUser = new User(body)

  newUser.save()
    .then(result => {
      res.send(result);
      console.log("done")
    })
    .catch(err => {
      console.log(err);
    });
})

app.get('/u/:username', (req, res) => {
  const user = req.params.username
  User.find({username: user})
  .then(result => {

    if(result.length > 0) {
      res.status(200).json(result)
    }
    else {
      res.status(404).json({error: 'User not found'})
    }
  })
  .catch(err => {
    res.status(500).send(err)
  });
})

app.post('/ask', (req, res) => {
  const question = new Question(req.body)

  question.save()
    .then(result => {
      res.send(result);
      console.log("done")
    })
    .catch(err => {
      console.log(err);
    });
  
})

app.get('/q/:question', (req, res) => {
  const qId = req.params.question
  let ans = req.query.ans

  Question.findById(qId)
  .then(result => {

    let doc = result;

    if(result) {
      if(ans) {

        doc.answers = doc.answers.filter(it => {
          return it._id.toString() == ans
        })

      }
      res.status(200).json(doc)
    }
    else {
      res.status(404).json({error: 'Question not found'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  });

})

app.post('/answer', (req, res) => {
  const qId = req.query.q

  Question.findById(qId)
  .then(result => {

    if(result) {
      result.answers.push(req.body)
      result.save()
      res.status(200).json(result)
    }
    else {
      res.status(404).json({error: 'Answer not found'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  });

})
// start the app on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port',PORT));