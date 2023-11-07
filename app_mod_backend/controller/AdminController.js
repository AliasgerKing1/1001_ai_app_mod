const routes = require("express").Router();
const sha1 = require("sha1")
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken")

routes.post("/loginauth",  async(req,res) => {
    let username = req.body.username;
    let password = sha1(req.body.password);
    let result = await Admin.find({username : username});
    if(result.length > 0) {
        if(result[0]?.password == password) {
            let obj = {
                _id : result[0]._id,
                username : result[0].username
            }
            let token = jwt.sign(obj, "Aliasger web")
            // let lock_token = str()
            res.send({status : 200, success : true, token : token});
            // res.send({status : 200, success : true, token : token, lock_token : lock_token});
        } else 
        res.send({status : 403, success : false, errType : 2});
    } else 
    res.send({status : 403, success : false, errType : 1});
})

routes.get("/", async (req,res)=> {
    if(req.headers.token) {
        let token = req.headers.token;
        let obj = jwt.decode(token, "Aliasger web")
        let result = await Admin.find({_id : obj._id})
        res.send(result)
    }
})


routes.put('/', async (req,res) => {
    if(req.headers.token) {
        let token = req.headers.token;
        let obj = jwt.decode(token, "Aliasger web")
       await Admin.updateMany({_id : obj._id}, req.body)
       // Fetch the updated documents
let result = await Admin.find({ _id: obj._id });

        res.send({status : 200, success : true, updatedData : result})
    }
})
module.exports = routes;