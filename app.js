const express = require("express");
const app = express();
const cors = require("cors")
const ejs = require("ejs")
require("./config/database")

app.set("view engine", "ejs");
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// base route 
app.get("/", (req, res) => {
    res.render("index")
})

// register route 
app.get("/register", (req, res) => {
    res.render("register")
})

// register : post 
app.post("/register", (req, res) => {
    try {
        res.status(201).json({ message: "user is saved" })
    }
    catch {
        res.status(403).json({ message: "user not saved" })
    }
})


// login route 
app.get("/login", (req, res) => {
    res.render("login")
})

// login : post 

app.post("/login", (req, res) => {
    try {
        res.status(201).json({ message: "user is saved" })
    }
    catch {
        res.status(403).json({ message: "user not saved" })
    }
})

// getting protfolio 
app.get("/profile", (req, res) => {
    res.render("profile")
})

// logout : post 
app.get("/logout", (req, res) => {
    res.redirect("/")
})



module.exports = app;