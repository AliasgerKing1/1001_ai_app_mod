require("../config/database")
const mongoose = require("mongoose");

const ModAppCategorySchema = mongoose.Schema({
    category : String,
})

module.exports = mongoose.model("mod_app_category", ModAppCategorySchema);