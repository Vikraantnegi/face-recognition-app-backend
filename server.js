const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/Signin');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : true
    }
  });

app.get('/', (req, res) =>{
    res.send(db.users);
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.post('/image', (req, res) => {profile.handleApiCall(req, res)})

app.listen(process.env.PORT || 4000, () =>{
    console.log(`App is running on port ${process.env.PORT}`);
})