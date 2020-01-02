const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});


const app = express();
app.use(express.json());
app.use(cors());

//Normal route & function
app.get('/', (req, res) => { res.send('Server is working') });

//Shorthand function - req & res automatically passed to function. Call them in the controller
app.post('/signin', signin.handleSignin(bcrypt, db));

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3001, () => {
    console.log('App is running, port 3001')
})
