require('dotenv').config();
 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const hasher = require('password-hash');
const jwt = require('jsonwebtoken');
const auth = require('./checkAuth');
 
const Answer = require('./models/answer');
const Question = require('./models/question');
const _ = require('./models/user');
const User = _.User
 
const app = express();
app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}));
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
 
 
app.get('/all-questions',(req,res)=>{
  Question.find()
  .then((result)=>{
    res.send(result);
  })
  .catch(err=>{
    console.log(err)
  })
});
 
app.post('/login', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  console.log(name,email);
  User.findOne({ fullName: name, email: email }, (err, doc) => {
    if(err) {
      return console.log(err)
    }
 
    let payload = {}
 
    if(doc) {
 
      payload = {
        fullName: doc.fullName,
        email: doc.email
      }
 
    } 
 
    else {
 
      const newUser = new User({
        fullName: name,
        email: email
      })
 
      newUser.save()
        .then(result => {
          payload = {
            fullName: result.fullName,
            email: result.email
          }
          console.log("reached payload");
        })
        .catch(err => {
          console.log(err);
        //  return res.send( { error: err } )
        })
 
    }
 
    jwt.sign(payload, process.env.TOKEN_KEY, (err, token) => {
      if(err) return res.send( { error: err } )
      return res.send({ token })
    })
 
  })
})
 
app.get('/u/:email', (req, res) => {
  const user = req.params.email
  User.find({email: user})
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
 
app.post('/ask', auth, (req, res) => {
  const qBody = req.body
  qBody.postedBy = req.user
  const question = new Question(qBody)
 
  question.save()
    .then(result => {
      res.send({
        result
      });
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
 
app.post('/answer/:question', auth, (req, res) => {
  const qId = req.params.question
  const ansBody = req.body
  ansBody.postedBy = req.user

  Question.findById(qId)
  .then(result => {
 
    if(result) {
      result.answers.push(ansBody)
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
 
app.delete('/q/:question', auth, (req, res) => {
  const qId = req.params.question
  let ans = req.query.ans
 
  Question.findById(qId)
  .then(result => {
 
    let doc = result;
 
    if(result) {
 
      if(ans) {
 
        let temp = doc.answers.filter(it => {
          return !(it._id.toString() == ans && it.postedBy.email == req.user.email)
        })
 
        if(temp.length != doc.answers.length) {
          doc.answers = temp
          doc.save()
          res.send(doc)
        }
 
        else {
          temp = temp.filter(it => {
            return it._id.toString() == ans
          })
 
          if(temp.length > 0) res.status(401).send({error: 'Unauthorized modify/delete'})
          else res.status(404).send({error: 'Answer not found'})
        }
 
      }
 
      else {
        if(req.user.email == result.postedBy.email) {
          doc.deleteOne()
          res.send(`Question ${doc._id} deleted`)
        }
 
        else {
          res.status(401).send({error: 'Unauthorized modify/delete'})
        }
      }
 
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
 
app.put('/q/:question', auth, (req, res) => {
  const qId = req.params.question
  const newBody = req.body.content
  let ans = req.query.ans
 
  Question.findById(qId)
  .then(result => {
 
    let doc = result;
 
    if(result) {
 
      if(ans) {
 
        let found = false;
        let hasAuth = false;
        doc.answers = doc.answers.map(item => {
          let x = item
 
          if(item._id == ans) {
            found = true;
            if(item.postedBy.email == req.user.email) {
              x.body = newBody
              hasAuth = true;
            }
          } 
 
          return x
        })
 
        if(!found) return res.status(404).send({error: 'Answer not found'})
        else if(!hasAuth) return res.status(401).send({error: 'Unauthorized modify/delete'})
 
      }
 
      else {
        if(req.user.email == result.postedBy.email) {
          doc.body = newBody
        }
 
        else {
          return res.status(401).send({error: 'Unauthorized modify/delete'})
        }
      }
 
      doc.save()
      res.send(doc)
 
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
 
app.put('/upvote/:question', auth, (req, res) => {
  const qId = req.params.question
  const uId = req.user.email
  let ans = req.query.ans

  Question.findById(qId)
  .then(result => {
 
    let doc = result;
 
    if(result) {
 
      if(ans) {
 
        let found = false;
        doc.answers = doc.answers.map(item => {
          let x = item
 
          if(item._id == ans) {
            found = true;
            x.downvoteList = x.downvoteList.filter(id => id != uId)

            let temp = x.upvoteList.filter(id => id != uId)
            if(temp.length == x.upvoteList.length) temp.push(uId)

            x.upvoteList = temp
            x.upvotes = x.upvoteList.length - x.downvoteList.length
          } 
 
          return x
        })
 
        if(!found) return res.status(404).send({error: 'Answer not found'})

      }
 
      else {
        doc.downvoteList = doc.downvoteList.filter(id => id != uId)

        let temp = doc.upvoteList.filter(id => id != uId)
        if(temp.length == doc.upvoteList.length) temp.push(uId)

        doc.upvoteList = temp
        doc.upvotes = doc.upvoteList.length - doc.downvoteList.length
      }
 
      doc.save()
      res.send(doc)
 
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

app.put('/downvote/:question', auth, (req, res) => {
  const qId = req.params.question
  const uId = req.user.email
  let ans = req.query.ans

  Question.findById(qId)
  .then(result => {
 
    let doc = result;
 
    if(result) {
 
      if(ans) {
 
        let found = false;
        doc.answers = doc.answers.map(item => {
          let x = item
 
          if(item._id == ans) {
            found = true;
            x.upvoteList = x.upvoteList.filter(id => id != uId)

            let temp = x.downvoteList.filter(id => id != uId)
            if(temp.length == x.downvoteList.length) temp.push(uId)

            x.downvoteList = temp
            x.upvotes = x.upvoteList.length - x.downvoteList.length

          } 
 
          return x
        })
 
        if(!found) return res.status(404).send({error: 'Answer not found'})

      }
 
      else {
        doc.upvoteList = doc.upvoteList.filter(id => id != uId)

        let temp = doc.downvoteList.filter(id => id != uId)
        if(temp.length == doc.downvoteList.length) temp.push(uId)

        doc.downvoteList = temp
        doc.upvotes = doc.upvoteList.length - doc.downvoteList.length
      }
 
      doc.save()
      res.send(doc)
 
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

app.put('/report/:question', auth, (req, res) => {
  const qId = req.params.question
  let ans = req.query.ans

  Question.findById(qId)
  .then(result => {
 
    let doc = result;
 
    if(result) {
      if(ans) {
 
        doc.answers = doc.answers.map(item => {
          let x = item

          if(item._id == ans) x.reports++;
 
          return x;
        })
 
      }
 
      else doc.reports++;
 
      doc.save()
      res.send(doc)
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

app.put('/approve/:question/:answer', auth, (req, res) => {
  const qId = req.params.question;
  const ans = req.params.answer;

  Question.findById(qId)
  .then(result => {
    if(result) {

      if(result.postedBy == req.user.email) {
        doc.answers = doc.answers.map(item => {
          let x = item
  
          if(item._id == ans) x.approved = true;
  
          return x
        })
    
        doc.save()
        res.send(doc)
      }

      else return res.status(401).send({error: 'Unauthorized modify/delete'})
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
 
app.get('/search', (req, res) => {
 
  const searchTerm = req.query.q
  const regex = searchTerm.replace(" ", "|")
  const searchRegex = new RegExp(regex)
 
  Question.find({ $or: [
    { body: { $regex: searchRegex, $options: 'i' } },
    { title: { $regex: searchRegex, $options: 'i' } },
    { answers: { $elemMatch: { body: { $regex: searchRegex, $options: 'i' } } } },
    { tags: { $regex: searchRegex, $options: 'i' } }
  ]})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
 
})
// start the app on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port',PORT));