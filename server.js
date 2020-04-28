const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/Signin');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');

app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'msd7912!!',
      database : 'braniac'
    }
  });

app.get('/', (req, res) =>{
    res.send(db.users);
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.post('/image', (req, res) => {profile.handleApiCall(req, res)})

app.listen(4000, () =>{
    console.log('App is running');
})