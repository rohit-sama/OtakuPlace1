const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const secretpass = bcrypt.genSaltSync(10);


app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req,res) => {
  const {name, email,password} = req.body;
try {
  const user = await User.create({
    name,
    email,
    password:bcrypt.hashSync(password, secretpass),
  });
  res.json(user);
} catch (e) {
  res.status(422).json(e);
}
});


app.post('/login', async (req,res) => {
  const {email,password} = req.body;

 const user =  await User.findOne({email});

 if(user) {
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk){
    res.json('user found')
  }else{
    res.status(422).json("password incorrect")
  }
 }else{
  res.json('not found')
 }
});

app.listen(4000);
//4gk9pRdGhFYfdCFu