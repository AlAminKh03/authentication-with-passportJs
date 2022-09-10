const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const user = mongoose.model("passUsers", userSchema)

module.exports = user;