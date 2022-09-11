const express = require("express");
const app = express();
const cors = require("cors")
const ejs = require("ejs")
require("dotenv").config()
require("./config/database")
require("./config/passport")
const Users = require("./model/user.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

app.set("view engine", "ejs");
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// session setup 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions"
    })
}))
// cookie: { secure: true }

// passport setup 
app.use(passport.initialize())
app.use(passport.session())
// base route 
app.get("/", (req, res) => {
    res.render("index")
})

// register route 
app.get("/register", (req, res) => {
    res.render("register")
})

// register : post 
app.post("/register", async (req, res) => {
    try {
        const userExist = await Users.findOne({ username: req.body.username })
        if (userExist) {
            res.status(403).json({ message: "user already in here" })
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                const newUser = new Users({
                    username: req.body.username,
                    password: hash
                })
                await newUser.save()
                console.log(newUser)
                res.status(201).redirect("/login")
            });
        }
    }
    catch (error) {

        res.status(403).json(error.message)
    }
})


// login route 
app.get("/login", (req, res) => {
    res.render("login")
})

// login : post 

app.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            successRedirect: "/profile"
        }),
);

// getting protfolio 
app.get("/profile", (req, res) => {
    res.render("profile")
})

// logout : post 
app.get("/logout", (req, res) => {
    res.redirect("/")
})

module.exports = app;