const routes = require("express").Router();
const ModAppCategory = require('../models/ModAppCategory');

  routes.post("/",async (req,res)=> {
        let result = await ModAppCategory.create(req.body);
        res.send({status : 200, data  : result});
      })
      
routes.get('/', async (req,res) => {
  let result = await ModAppCategory.find({});
  res.send(result)
})
// routes.delete("/:id", async (req,res)=> {
//     let id = req.params.id;
//         let result = await ModAppCategory.findOneAndDelete({_id : id})
//         res.send({status : 200, success : true, deletedData : result})
// })
// routes.delete("/", async (req,res)=> {
//         await ModAppCategory.deleteMany()
//         res.send({status : 200 })
// })

// routes.get("/:id", async (req,res)=> {
//     let id = req.params.id;
//         let result = await ModAppCategory.find({_id : id})
//         res.send(result)
// })


// routes.put('/:id', async (req,res) => {
//   let id = req.params.id;
//   await ModAppCategory.updateMany({_id : id}, data);
//   // Fetch the updated documents
//   let result = await ModAppCategory.find({ _id: id });

//   res.send({status : 200, success : true, updatedData : result});
// });

module.exports = routes;