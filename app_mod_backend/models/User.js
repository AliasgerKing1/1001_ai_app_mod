require("../config/database")
const mongoose = require("mongoose");

const User = mongoose.Schema({
    password: String,
    username: String,
    join_date : String,
    role : String,
    email: String,
})
module.exports = mongoose.model("user", User);