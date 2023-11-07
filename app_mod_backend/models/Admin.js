require("../config/database")
const mongoose = require("mongoose");

const Admin = mongoose.Schema({
    password: String,
    username: String,
    join_date : String,
    email: String,
})
module.exports = mongoose.model("admin", Admin);