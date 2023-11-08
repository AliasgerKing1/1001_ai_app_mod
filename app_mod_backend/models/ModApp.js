require("../config/database")
const mongoose = require("mongoose");

const ModApp = mongoose.Schema({
    app_name: String,
    upload_date: String,
    mod_version : String,
    category: String,
    os : String,
    isUpdatedToCloud : {
        type : Boolean,
        default : false
    },
    share_link : String,
    description : {
        type : String,
        default : ""
    },
    cloudName : {
        type : String,
        default : ""
    },
    image : {
        type : Array,
        default : []
    },
    comment : {
        type : Array,
        default : []
    }
})
module.exports = mongoose.model("mod_app", ModApp);