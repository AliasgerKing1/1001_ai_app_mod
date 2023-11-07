const routes = require("express").Router();
const ModApp = require("../models/ModApp");
const jwt = require("jsonwebtoken")
const str = require('random-string')


routes.post("/", async (req,res)=> {
        let newName = str({length  : 100});
        req.body.cloudName = newName;
    let result = await ModApp.create(req.body);
        res.send({status : 200, data  : result});
})
routes.get("/", async (req,res)=> {
        let result = await ModApp.find({})
        res.send(result)
})
routes.delete("/:id", async (req,res)=> {
    let id = req.params.id;
        let result = await ModApp.findOneAndDelete({_id : id})
        res.send({status : 200, success : true, deletedData : result})
})
// routes.delete("/", async (req,res)=> {
//         await ModApp.deleteMany()
//         res.send({status : 200 })
// })
routes.get("/:id", async (req,res)=> {
    let id = req.params.id;
        let result = await ModApp.find({_id : id})
        res.send(result)
})


routes.put('/:id', async (req,res) => {
    let id = req.params.id;
       await ModApp.updateMany({_id : id}, req.body)
       // Fetch the updated documents
let result = await ModApp.find({ _id: id });

        res.send({status : 200, success : true, updatedData : result})
})
module.exports = routes;