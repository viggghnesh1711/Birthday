const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const mongoose=require('mongoose')
const config=require('config')
require('dotenv').config()
const bodyParser = require('body-parser');
const db = require('./mongoose-connection')
const msgmodel = require('./models/msgmodel')


const app = express();

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Set up flash middleware
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    const currentDate = new Date(); // Get the current date and time
    const specificDate = new Date('2024-10-14T23:26:00'); // Set your specific date and time

    // Check if the current date is after the specific date
    if (false) { // {{ edit_1 }}
        res.render("login", { message: req.flash('error') }); 
    } else {
         res.render("time")
    }
});

app.post('/login', function (req, res) {
    const password = req.body.pass; 
    if (password =='Panda' || password =='panda' || password =='sunnya' || password =='Sunnya' || password =='tanuvigh' || password =='Tanuvigh' || password =='Gubaad' || password =='Gubdii' ||  password =='gubaad' || password =='gubdii' ) {
        res.cookie('token', 'tooeken')
        res.redirect("/Home")
    } else {
        req.flash('error', 'Invalid verification!'); 
        res.redirect('/');
    }
});

app.post('/data', async function (req, res) {
    const dta = req.body.userText;
   try{
    let message =await msgmodel.create({
        message:dta
        })
        console.log(message);

        res.redirect('/Home');
   }
   catch(error){
    console.log("error "+error);
   }
    
    
});

app.get('/Home', function (req, res) {
    // Check if the 'token' cookie is present
    if (req.cookies.token) {
        res.render("Home");
    } else {
        res.redirect('/'); // Redirect to login if token is not present
    }
});

app.get('/backup', function (req, res) {
        res.render("Home");
});

app.get('/logout', function (req, res) {
    // Clear the 'token' cookie
    res.clearCookie('token'); // {{ edit_1 }}
    
    res.redirect("/"); // Redirect to login
});

app.get('/admin', function (req, res) {
    res.render("adminlogin")
    
});

app.post('/adminverify', function (req, res) {
    const password = req.body.pass; 
    console.log("Password entered:", password);
    
    if (password =='Sunny@0059' ) {
        res.cookie('admin', 'admin')
        res.redirect("/adminhome")
    } else {
        req.flash('error', 'Invalid verification!'); 
        res.redirect('/');
    }
});

app.get('/adminhome', async function (req, res) {
    // Check if the 'token' cookie is present
    if (req.cookies.admin) {
        try {
            
            const messages = await msgmodel.find(); // Fetch messages from the database
            res.render("adminhome", { messages }); // Pass messages to the view
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).send('Internal Server Error'); // Handle database errors
        }
    } else {
        res.redirect('/'); // Redirect to login if token is not present
    }
});

app.get('/adminlogout', function (req, res) {
    // Clear the 'token' cookie
    res.clearCookie('admin'); // {{ edit_1 }}
    
    res.redirect("/"); // Redirect to login
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
