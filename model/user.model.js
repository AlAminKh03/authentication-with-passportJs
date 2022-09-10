const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const Users = mongoose.model("authusers", userSchema)

module.exports = Users;